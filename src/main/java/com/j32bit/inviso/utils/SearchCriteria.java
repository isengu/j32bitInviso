package com.j32bit.inviso.utils;

import com.j32bit.inviso.enums.SearchOperation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchCriteria {

    private String fieldName;
    private String value;
    private SearchOperation operation = SearchOperation.MATCH;

}
