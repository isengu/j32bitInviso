package com.j32bit.inviso.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FormComponentDataDto {

    private Long id;
    private String value;
    private FormComponentDto formComponent;

}
