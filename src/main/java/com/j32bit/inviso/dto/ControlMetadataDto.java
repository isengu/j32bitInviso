package com.j32bit.inviso.dto;

import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ControlMetadataDto {

    private Long id;
    private String barcode;
    private Timestamp controlDate;
    private Long coordinateX;
    private Long coordinateY;
    private String stateCode;
    private List<FormComponentDataDto> formComponentDatas;
    private ApplicationVersionDto applicationVersion;
    private UserDto user;

}
