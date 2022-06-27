package com.j32bit.inviso.service;

import com.j32bit.inviso.dto.response.DashboardReportResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

@Log4j2
@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ControlMetadataService controlMetadataService;

    public DashboardReportResponseDto reportFilledForms(int day) {
        DashboardReportResponseDto dashboardReportResponseDto = new DashboardReportResponseDto();

        if (day == 7) {
            Date now = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(now);

            for (int i = 0; i < 7; i++) {
                Timestamp start = new Timestamp(calendar.getTimeInMillis());
                calendar.add(Calendar.DATE, -1);
                Timestamp end = new Timestamp(calendar.getTimeInMillis());

                dashboardReportResponseDto.addCompleted(new DashboardReportResponseDto.DashboardReport(
                    controlMetadataService.countBetweenDates(start, end),
                    start,
                    end
                    ));
            }

            return dashboardReportResponseDto;
        } else if (day == 30) {
            Date now = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(now);

            for (int i = 0; i < 4; i++) {
                Timestamp start = new Timestamp(calendar.getTimeInMillis());
                calendar.add(Calendar.DATE, -7);
                Timestamp end = new Timestamp(calendar.getTimeInMillis());

                dashboardReportResponseDto.addCompleted(new DashboardReportResponseDto.DashboardReport(
                    controlMetadataService.countBetweenDates(start, end),
                    start,
                    end
                    ));
            }

            return dashboardReportResponseDto;
        } else if (day == 90) {
            Date now = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(now);

            for (int i = 0; i < 3; i++) {
                Timestamp start = new Timestamp(calendar.getTimeInMillis());
                calendar.add(Calendar.DATE, -30);
                Timestamp end = new Timestamp(calendar.getTimeInMillis());

                dashboardReportResponseDto.addCompleted(new DashboardReportResponseDto.DashboardReport(
                    controlMetadataService.countBetweenDates(start, end),
                    start,
                    end
                    ));
            }

            return dashboardReportResponseDto;
        }

        return null;

    }

}
