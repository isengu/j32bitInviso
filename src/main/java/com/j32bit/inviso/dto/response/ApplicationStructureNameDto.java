package com.j32bit.inviso.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationStructureNameDto {

    @JsonProperty("key")
    private String name;
    @JsonProperty("value")
    private Long applicationId;
}
