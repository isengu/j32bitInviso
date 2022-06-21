package com.j32bit.inviso.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDto implements Serializable {

    private Long id;
    private Timestamp createdAt;
    private String createdBy;
    private List<UserDto> users;

}
