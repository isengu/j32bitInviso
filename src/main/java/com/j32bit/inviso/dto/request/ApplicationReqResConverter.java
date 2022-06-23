package com.j32bit.inviso.dto.request;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.j32bit.inviso.dto.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.groupingBy;

public class ApplicationReqResConverter {

    public static ApplicationReqResDto toResponse(ApplicationVersionDto applicationVersionDto) {
        List<ApplicationReqResDto.Page> pageList = new ArrayList<>();

        if (applicationVersionDto.getPages() != null) {
            int totalPage = applicationVersionDto.getPages().size();

            for (int i = 0; i < totalPage; i++) {
                PageDto pageDtoPrevious = i == 0 ?
                        null : applicationVersionDto.getPages().get(i-1);

                PageDto pageDtoNext = i == totalPage-1 ?
                        null : applicationVersionDto.getPages().get(i+1);

                PageDto pageDto = applicationVersionDto.getPages().get(i);

                pageList.add(transformPage(
                        pageDto,
                        applicationVersionDto.getApplication().getId(),
                        pageDtoPrevious,
                        pageDtoNext));
            }
        }

        return new ApplicationReqResDto(
                applicationVersionDto.getApplication().getId(),
                applicationVersionDto.getDescription(),
                applicationVersionDto.getName(),
                new ApplicationReqResDto.Version(applicationVersionDto.getVersion()),
                applicationVersionDto.getShortName(),
                applicationVersionDto.getApplication().getCreatedAt(),
                applicationVersionDto.getUpdatedAt(),
                pageList
        );
    }

    public static ApplicationVersionDto fromRequest(String json) throws IOException {
        ObjectMapper mapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);

        SaveRequestBaseDto<ApplicationReqResDto> request = mapper.readValue(json,
                new TypeReference<SaveRequestBaseDto<ApplicationReqResDto>>() {});

        ApplicationReqResDto structure = request.getData();

        if (structure.getId() == null) {
            return ApplicationVersionDto.builder()
                    .name(structure.getName())
                    .description(structure.getDescription())
                    .shortName(structure.getShortName())
                    .version(BigDecimal.ONE)
                    .build();
        }
        else {
            List<PageDto> pageDtoList = new ArrayList<>();
            for (ApplicationReqResDto.Page page : structure.getPages()) {
                pageDtoList.add(transformPage(page));
            }

            return ApplicationVersionDto.builder()
                    .name(structure.getName())
                    .description(structure.getDescription())
                    .shortName(structure.getShortName())
                    .version(
                            BigDecimal.valueOf(
                                    Double.parseDouble(structure.getVersion().getVersion()))
                                    .add(BigDecimal.valueOf(0.1)))
                    .pages(pageDtoList)
                    .application(ApplicationDto.builder()
                            .id(structure.getId())
                            .build())
                    .build();
        }

    }

    private static PageDto transformPage(ApplicationReqResDto.Page page) {
        List<FormDto> formDtoList = new ArrayList<>();
        for (ApplicationReqResDto.Form form : page.getForms()) {
            formDtoList.add(transformForm(form));
        }

        return PageDto.builder()
                .title(page.getTitle())
                .pageNumber(page.getPageNumber())
                .shortName(page.getShortName())
                .isPageNameHidden(page.getIsPageNameHide())
                .isHomePage(page.getHomePage())
                .forms(formDtoList)
                .build();
    }

    private static ApplicationReqResDto.Page transformPage(PageDto pageDto, Long applicationId, PageDto pageDtoPrevious, PageDto pageDtoNext) {
        // Create Navigations
        List<ApplicationReqResDto.Page.Navigation> navigationList = new ArrayList<>();
        int orderNumber = 0;
        if (pageDtoPrevious != null) {
            // navigation to previous page
            navigationList.add(ApplicationReqResDto.Page.Navigation
                            .create(
                                    orderNumber++,
                                    applicationId,
                                    "Previous Page",
                                    pageDtoPrevious.getShortName()));
        }
        if (pageDtoNext != null) {
            // navigation to next page
            navigationList.add(ApplicationReqResDto.Page.Navigation
                    .create(
                            orderNumber++,
                            applicationId,
                            "Next Page",
                            pageDtoNext.getShortName()));
        } else {
            // submit
            navigationList.add(ApplicationReqResDto.Page.Navigation
                    .create(
                            orderNumber++,
                            applicationId,
                            "submit"));
        }

        // transform nested sections
        List<ApplicationReqResDto.Form> formList = new ArrayList<>();
        for (FormDto formDto : pageDto.getForms()) {
            formList.add(transformForm(formDto));
        }

        return ApplicationReqResDto.Page.builder()
                .id(pageDto.getId())
                .title(pageDto.getTitle())
                .pageNumber(pageDto.getPageNumber())
                .shortName(pageDto.getShortName())
                .isPageNameHide(pageDto.getIsPageNameHidden())
                .homePage(pageDto.getIsHomePage())
                .forms(formList)
                .navigations(navigationList)
                .build();
    }

    private static FormDto transformForm(ApplicationReqResDto.Form form) {
        List<FormComponentDto> formComponentDtoList = new ArrayList<>();
        for (ApplicationReqResDto.Row row : form.getRows()) {
            for (ApplicationReqResDto.Component component : row.getComponents()) {
                formComponentDtoList.add(transformComponent(component));
            }
        }

        return FormDto.builder()
                .title(form.getTitle())
                .shortName(form.getShortName())
                .formComponents(formComponentDtoList)
                .build();
    }

    private static ApplicationReqResDto.Form transformForm(FormDto formDto) {
        List<ApplicationReqResDto.Row> rowList = new ArrayList<>();

        List<ApplicationReqResDto.Component> componentList = new ArrayList<>();
        for (FormComponentDto formComponentDto : formDto.getFormComponents()) {
            componentList.add(transformComponent(formComponentDto));
        }

        Map<Integer, List<ApplicationReqResDto.Component>> rowsMap =
                componentList.stream().collect(groupingBy(ApplicationReqResDto.Component::getRowNumber));
        List<List<ApplicationReqResDto.Component>> rows = new ArrayList<>(rowsMap.values());
        for (List<ApplicationReqResDto.Component> row : rows) {
            rowList.add(new ApplicationReqResDto.Row(row));
        }

        return ApplicationReqResDto.Form.builder()
                .id(formDto.getId())
                .title(formDto.getTitle())
                .shortName(formDto.getShortName())
                .rows(rowList)
                .build();

    }

    private static FormComponentDto transformComponent(
            ApplicationReqResDto.Component component) {
        List<FormComponentOptionDto> formComponentOptionDtoList = new ArrayList<>();
        for (ApplicationReqResDto.Option option : component.getOptions()) {
            formComponentOptionDtoList.add(transformOption(option));
        }
        List<FormComponentValidationDto> formComponentValidationDtoList = new ArrayList<>();
        for (ApplicationReqResDto.Validation validation : component.getValidations()) {
            formComponentValidationDtoList.add(transformValidation(validation));
        }

        return FormComponentDto.builder()
                .shortName(component.getShortName())
                .colSize(component.getColSize())
                .colAlign(component.getColAlign())
                .colNumber(component.getColNumber())
                .rowNumber(component.getRowNumber())
                .componentId(component.getId())
                .componentType(component.getType())
                .formComponentOptions(formComponentOptionDtoList)
                .formComponentValidations(formComponentValidationDtoList)
                .build();
    }

    private static ApplicationReqResDto.Component transformComponent(
            FormComponentDto formComponentDto) {
        List<ApplicationReqResDto.Option> optionList = new ArrayList<>();
        for (FormComponentOptionDto formComponentOptionDto : formComponentDto.getFormComponentOptions()) {
            optionList.add(transformOption(formComponentOptionDto));
        }
        List<ApplicationReqResDto.Validation> validationList = new ArrayList<>();
        for (FormComponentValidationDto formComponentValidationDto : formComponentDto.getFormComponentValidations()) {
            validationList.add(transformValidation(formComponentValidationDto));
        }

        return ApplicationReqResDto.Component.builder()
                .id(formComponentDto.getComponentId())
                .colAlign(formComponentDto.getColAlign())
                .formComponentId(formComponentDto.getId())
                .colNumber(formComponentDto.getColNumber())
                .colSize(formComponentDto.getColSize())
                .rowNumber(formComponentDto.getRowNumber())
                .type(formComponentDto.getComponentType())
                .shortName(formComponentDto.getShortName())
                .options(optionList)
                .validations(validationList)
                .build();
    }

    private static FormComponentOptionDto transformOption(
            ApplicationReqResDto.Option option) {
        return FormComponentOptionDto.builder()
                .orderNumber(option.getOrderNumber())
                .option(OptionDto.builder()
                        .id(option.getOptionTypeId())
                        .build())
                .key(option.getKey())
                .name(option.getName())
                .value(option.getValue())
                .build();
    }

    private static ApplicationReqResDto.Option transformOption(
            FormComponentOptionDto formComponentOptionDto) {
        return ApplicationReqResDto.Option.builder()
                .id(formComponentOptionDto.getId())
                .orderNumber(formComponentOptionDto.getOrderNumber())
                .key(formComponentOptionDto.getKey())
                .value(formComponentOptionDto.getValue())
                .type(formComponentOptionDto.getOption().getType())
                .name(formComponentOptionDto.getName())
                .optionTypeId(formComponentOptionDto.getOption().getId())
                .build();
    }

    private static FormComponentValidationDto transformValidation(
            ApplicationReqResDto.Validation validation) {
        return FormComponentValidationDto.builder()
                .errorMessage(validation.getErrorMessage())
                .value(validation.getValue())
                .validationId(validation.getId())
                .validationName(validation.getName())
                .selectable(validation.getSelectable())
                .type(validation.getType())
                .build();
    }

    private static ApplicationReqResDto.Validation transformValidation(
            FormComponentValidationDto formComponentValidationDto) {
        return ApplicationReqResDto.Validation.builder()
                .id(formComponentValidationDto.getValidationId())
                .errorMessage(formComponentValidationDto.getErrorMessage())
                .name(formComponentValidationDto.getValidationName())
                .value(formComponentValidationDto.getValue())
                .selectable(formComponentValidationDto.getSelectable())
                .type(formComponentValidationDto.getType())
                .build();
    }

}
