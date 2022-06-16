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
public class FormComponentOptionDto implements Serializable {

    private Long id;
    private Integer orderNumber;
    private OptionDto option;
    private String key;
    private String name;
    private String value;

}
