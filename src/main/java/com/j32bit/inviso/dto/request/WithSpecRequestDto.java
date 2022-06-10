package com.j32bit.inviso.dto.request;

import com.j32bit.inviso.utils.SearchCriteria;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * The request DTO that is being used in findAll requests
 *
 * @see SearchCriteria
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WithSpecRequestDto {

    private List<SearchCriteria> filterRequest;
    private int offset;
    private String order;
    private int limit;

}
