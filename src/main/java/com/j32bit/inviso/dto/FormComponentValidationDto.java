package com.j32bit.inviso.dto;

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

    private Long id;
    private String errorMessage;
    private String value;
    private ValidationDto validation;
}
