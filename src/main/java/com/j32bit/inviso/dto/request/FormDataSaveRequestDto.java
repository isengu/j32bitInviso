package com.j32bit.inviso.dto.request;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FormDataSaveRequestDto {

    private Long applicationId;
    private Long assignmentId;
    private String barcode;
    private Long controlMetadataId;
    private Map<String, Long> components;
    private Timestamp controlDate;
    private String controlPoint;
    private Long coordinateX;
    private Long coordinateY;
    private String applicationName;
    private String deviceId;
    @JsonProperty("userName")
    private String username;
    private BigDecimal version;

    private Map<String, Object> formComponentData = new HashMap<>();

    // it will cast any fields other than defined above to this setter
    @JsonAnySetter
    public void setFormComponentData(String key, Object value) {
        formComponentData.put(key, value);
    }

    public String getFormComponentData() {
        return "{" + formComponentData.entrySet().stream().map(e -> "\"" + e.getKey() + "\": \"" + e.getValue().toString().replace("\"", "\\\"") + "\"")
                                    .collect(Collectors.joining(",")) + "}";
    }

    public Map<String, Object> getFormComponentDataAsMap() {
        return formComponentData;
    }

}
