package com.j32bit.inviso.utils;

import com.j32bit.inviso.enums.SearchOperation;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class SearchCriteria {

    private String fieldName;
    private String value;
    @EqualsAndHashCode.Exclude
    private SearchOperation operation = SearchOperation.MATCH;

}
