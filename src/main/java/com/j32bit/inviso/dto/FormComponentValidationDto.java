package com.j32bit.inviso.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FormComponentValidationDto implements Serializable {

    @JsonProperty("formComponentValidationId")
    private Long id;
    private String errorMessage;
    private String value;
    private Boolean selectable;
    private Integer type;
    @JsonProperty("id")
    private Long validationId;
    @JsonProperty("name")
    private String validationName;
}
