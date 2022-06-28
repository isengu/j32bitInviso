package com.j32bit.inviso.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvisoPageable<T> {

    private List<T> objList;
    private long totalSize;

    public static <K> InvisoPageable<K> fromPage(Page<K> page) {
        return new InvisoPageable<K>(page.getContent(), page.getTotalElements());
    }

}
