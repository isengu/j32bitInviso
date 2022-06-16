package com.j32bit.inviso.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageDto implements Serializable {

    @Serial
    private static final long serialVersionUID = -1L;

    private Long id;
    private String title;
    private Integer pageNumber;
    private String shortName;
    private Boolean isPageNameHidden;
    private Boolean isHomePage;
    private List<FormDto> forms;
}
