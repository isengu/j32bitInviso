package com.j32bit.inviso.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.j32bit.inviso.domain.ControlMetadata;
import com.j32bit.inviso.dto.ControlMetadataDto;
import com.j32bit.inviso.dto.FormComponentDataDto;
import com.j32bit.inviso.dto.FormComponentDto;
import com.j32bit.inviso.dto.request.FormDataSaveRequestDto;
import com.j32bit.inviso.dto.request.WithSpecRequestDto;
import com.j32bit.inviso.enums.SearchOperation;
import com.j32bit.inviso.repository.ControlMetadataRepositroy;
import com.j32bit.inviso.shared.SearchSpecification;
import com.j32bit.inviso.utils.SearchCriteria;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Log4j2
@Service
@RequiredArgsConstructor
public class ControlMetadataService {

    private final ApplicationVersionService applicationVersionService;
    private final UserService userService;
    private final ControlMetadataRepositroy controlMetadataRepositroy;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;

    public ControlMetadataDto saveFormData(FormDataSaveRequestDto formDataSaveRequestDto) {
        List<FormComponentDataDto> formComponentDataDtoList = new ArrayList<>();

        Map<String, Object> datas = formDataSaveRequestDto.getFormComponentDataAsMap();
        Set<String> componentShortNames = datas.keySet();
        Map<String, Long> componentMapShortNametoId = formDataSaveRequestDto.getComponents();

        for (String shortName : componentShortNames) {
            // TODO if shortname not exist - exception
            Long formComponentId = componentMapShortNametoId.get(shortName);

            formComponentDataDtoList.add(FormComponentDataDto.builder()
                            .value((String) datas.get(shortName))
                            .formComponent(FormComponentDto.builder()
                                    .id(formComponentId)
                                    .build())
                            .build());
        }

        ControlMetadataDto controlMetadataDto = ControlMetadataDto.builder()
                .barcode(formDataSaveRequestDto.getBarcode())
                .controlDate(formDataSaveRequestDto.getControlDate())
                .coordinateX(formDataSaveRequestDto.getCoordinateX())
                .coordinateY(formDataSaveRequestDto.getCoordinateY())
                .formComponentDatas(formComponentDataDtoList)
                .applicationVersion(applicationVersionService.getAppInfoOfVersionOfApplication(
                        formDataSaveRequestDto.getApplicationId(), formDataSaveRequestDto.getVersion()))
                .user(userService.findByUsername(formDataSaveRequestDto.getUsername()))
                .build();

        ControlMetadata save = controlMetadataRepositroy
                .save(modelMapper.map(controlMetadataDto, ControlMetadata.class));

        return modelMapper.map(save, ControlMetadataDto.class);
    }

    public Map<String, Object> getAllControlMetadataWithSpec(WithSpecRequestDto withSpecRequestDto) {
        // get all as pageable
        Page<ControlMetadataDto> page = findAllWithSpec(withSpecRequestDto);

        List<FormDataSaveRequestDto> formDataSaveRequestDtoList = new ArrayList<>();

        // convert FormDataSaveRequestDtos to FormDataSaveRequestDtos
        for (ControlMetadataDto controlMetadataDto : page.getContent()) {
            List<FormComponentDataDto> formComponentDataDtoList = controlMetadataDto.getFormComponentDatas();

            // make HashMap as type of {formComponentShortName : formComponentDataValue} from formComponentDataDtos
            Map<String, Object> formComponentsDataMap = new HashMap<>();
            for (FormComponentDataDto formComponentDataDto : formComponentDataDtoList) {
                formComponentsDataMap.put(formComponentDataDto.getFormComponent().getShortName(), formComponentDataDto.getValue());
            }

            formDataSaveRequestDtoList.add(FormDataSaveRequestDto.builder()
                    .applicationId(controlMetadataDto.getApplicationVersion().getApplication().getId())
                    .controlDate(controlMetadataDto.getControlDate())
                    .controlMetadataId(controlMetadataDto.getId())
                    .barcode(controlMetadataDto.getBarcode())
                    .coordinateX(controlMetadataDto.getCoordinateX())
                    .coordinateY(controlMetadataDto.getCoordinateY())
                    .applicationName(controlMetadataDto.getApplicationVersion().getName())
                    .formComponentData(formComponentsDataMap)
                    .version(controlMetadataDto.getApplicationVersion().getVersion())
                    .username(controlMetadataDto.getUser().getUsername())
                    .build());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("objList", formDataSaveRequestDtoList);
        response.put("totalSize", page.getTotalElements());

        return response;
    }

    public Page<ControlMetadataDto> findAllWithSpec(WithSpecRequestDto withSpecRequestDto) {
        Set<SearchCriteria> criterias = withSpecRequestDto.getFilterRequest();

//        // if "status=1"(deleted) isn't specified always add "status=0"(not deleted) creteria
//        if (!criterias.contains(new SearchCriteria("status", "1", null))) {
//            criterias.add(new SearchCriteria("status", "0", SearchOperation.EQUAL));
//        }

        SearchSpecification<ControlMetadata> searchSpecification =
                new SearchSpecification<>(criterias);

        Sort sort = withSpecRequestDto.getOrder().equals("ASC") ?
                Sort.by(Sort.Direction.ASC, "id") : Sort.by(Sort.Direction.DESC, "id");

        int pageNumber = withSpecRequestDto.getOffset() / withSpecRequestDto.getLimit();

        Pageable pageable = PageRequest.of(pageNumber, withSpecRequestDto.getLimit(), sort);

        Page<ControlMetadata> page = controlMetadataRepositroy.findAll(searchSpecification, pageable);

        return page.map(e -> modelMapper.map(e, ControlMetadataDto.class));
    }

}
