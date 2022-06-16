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
public class ValidationDto implements Serializable {

    private Long id;
    private String name;

    public ValidationDto(Long id) {
        this.id = id;
    }
}
