package com.j32bit.inviso.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class SaveRequestBaseDto<T> {

    private T data;
    private String userName;
    private Long applicationId;

}
