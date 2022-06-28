package com.j32bit.inviso.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FormComponentDataDto {

    private Long id;
    private String value;
    private FormComponentDto formComponent;

}
