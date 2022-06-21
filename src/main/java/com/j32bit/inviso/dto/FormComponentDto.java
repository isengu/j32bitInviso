package com.j32bit.inviso.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormComponentDto implements Serializable {

    private Long id;
    private String shortName;
    private String colSize;
    private String colAlign;
    private Integer colNumber;
    private Integer rowNumber;
    @JsonProperty("formComponentId")
    private Long componentId;
    @JsonProperty("type")
    private String componentType;
    private List<FormComponentOptionDto> formComponentOptions;
    private List<FormComponentValidationDto> formComponentValidations;

}
