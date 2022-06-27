package com.j32bit.inviso.dto.response;

import lombok.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardReportResponseDto {

    private List<DashboardReport> completedList = new ArrayList<>();
    private List<DashboardReport> incompletedList = new ArrayList<>();

    public void addCompleted(DashboardReport d) {
        this.completedList.add(d);
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DashboardReport {

        private Long count;
        private Timestamp startDate;
        private Timestamp endDate;

    }

}
