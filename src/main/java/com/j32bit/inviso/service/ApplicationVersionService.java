package com.j32bit.inviso.service;

import com.j32bit.inviso.domain.ApplicationVersion;
import com.j32bit.inviso.domain.Application;
import com.j32bit.inviso.dto.*;
import com.j32bit.inviso.dto.request.ApplicationReqResConverter;
import com.j32bit.inviso.dto.request.ApplicationReqResDto;
import com.j32bit.inviso.dto.request.WithSpecRequestDto;
import com.j32bit.inviso.dto.response.ApplicationStructureNameDto;
import com.j32bit.inviso.enums.SearchOperation;
import com.j32bit.inviso.exception.InvisoException;
import com.j32bit.inviso.repository.ApplicationVersionRepository;
import com.j32bit.inviso.utils.SearchCriteria;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class ApplicationVersionService {

    private final ApplicationVersionRepository applicationVersionRepository;
    private final ApplicationService applicationService;
    private final ModelMapper modelMapper;

    public List<ApplicationReqResDto> getAllApplications() {
        return applicationVersionRepository
                .getAll()
                .stream()
                .map(e -> ApplicationReqResConverter.toResponse(
                        modelMapper.map(e, ApplicationVersionDto.class)))
                .collect(Collectors.toList());
    }

    public Page<ApplicationStructureNameDto> getStructureNamesWithSpec(WithSpecRequestDto withSpecRequestDto) {
        return this.findAllWithSpec(withSpecRequestDto)
                .map(e -> modelMapper.map(e, ApplicationStructureNameDto.class));
    }

    public List<ApplicationStructureNameDto> getStructureNames() {
        return applicationVersionRepository.getStructureNames();
    }

    public List<ApplicationStructureNameDto> getStructureNamesOfUser(String username) {
        return applicationVersionRepository.getStructureNamesOfUser(username);
    }

    public Page<ApplicationVersionDto> findAllWithSpec(WithSpecRequestDto withSpecRequestDto) {
        Set<SearchCriteria> criterias = withSpecRequestDto.getFilterRequest();

        // if "status=1"(deleted) isn't specified always add "status=0"(not deleted) creteria
        if (!criterias.contains(new SearchCriteria("status", "1", null))) {
            criterias.add(new SearchCriteria("status", "0", SearchOperation.EQUAL));
        }

        ApplicationVersionSpecification searchSpecification =
                new ApplicationVersionSpecification(criterias);

        Sort sort = withSpecRequestDto.getOrder().equals("ASC") ?
                Sort.by(Sort.Direction.ASC, "id") : Sort.by(Sort.Direction.DESC, "id");

        int pageNumber = withSpecRequestDto.getOffset() / withSpecRequestDto.getLimit();

        Pageable pageable = PageRequest.of(pageNumber, withSpecRequestDto.getLimit(), sort);

        Page<ApplicationVersion> page = applicationVersionRepository.findAll(searchSpecification, pageable);

        return page.map(e -> modelMapper.map(e, ApplicationVersionDto.class));
    }

    public ApplicationReqResDto getLastVersion(ApplicationDto applicationDto) {
        Application userApplication = modelMapper.map(applicationDto, Application.class);
        Optional<ApplicationVersion> application = applicationVersionRepository.getLastVersionOfUserApplication(userApplication);
        ApplicationVersionDto applicationVersionDto = modelMapper.map(
                application.orElseThrow(() -> new InvisoException("Application not found!")),
                ApplicationVersionDto.class);

        return ApplicationReqResConverter.toResponse(applicationVersionDto);
    }

    public ApplicationVersionDto getVersionOfApplication(Long applicationId, BigDecimal version) {
        ApplicationVersion applicationVersion = applicationVersionRepository
                .findByApplicationIdAndVersion(applicationId, version)
                .orElseThrow(() -> new InvisoException("Application with given id and version not found!"));

        return modelMapper.map(applicationVersion, ApplicationVersionDto.class);
    }

    public ApplicationVersionDto getAppInfoOfVersionOfApplication(Long applicationId, BigDecimal version) {
        ApplicationVersion applicationVersion = applicationVersionRepository
                .findAppInfoByApplicationIdAndVersion(applicationId, version)
                .orElseThrow(() -> new InvisoException("Application with given id and version not found!"));

        return modelMapper.map(applicationVersion, ApplicationVersionDto.class);
    }

    public ApplicationReqResDto save(String json) {
        try {
            ApplicationVersionDto applicationVersionDto = ApplicationReqResConverter.fromRequest(json);
            if (applicationVersionDto.getApplication() == null) {
                // first time saving
                applicationVersionDto.setApplication(
                        modelMapper.map(
                                applicationService.save(new ApplicationDto()),
                                ApplicationDto.class));
            }
            ApplicationVersion applicationVersion = applicationVersionRepository.save(modelMapper.map(applicationVersionDto, ApplicationVersion.class));
            return ApplicationReqResConverter.toResponse(modelMapper.map(applicationVersion, ApplicationVersionDto.class));
        }
        catch (IOException e) {
            throw new InvisoException(e.getMessage());
        }
    }

}
