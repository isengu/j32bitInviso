package com.j32bit.inviso.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto implements Serializable {

    @Serial
    private static final long serialVersionUID = -1L;

    private Long id;
    private String roleName;
    private String shortName;

}
