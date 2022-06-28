package com.j32bit.inviso.controller;

import com.j32bit.inviso.service.ApplicationVersionService;
import com.j32bit.inviso.service.DashboardService;
import com.j32bit.inviso.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final UserService userService;
    private final DashboardService dashboardService;
    private final ApplicationVersionService applicationVersionService;

    /**
     * Get filled form counts for dashboard chart on given interval by
     * dividing interval into sub-intervals
     * (e.g. for week divide by day, for month divide by week,
     * for 3 month divide by month).
     * <br><br>
     * intrevals are: week(7 days), month(30 days), 3 month(90 days).
     * <br>
     * if given interval is different than the three above it will return null.
     *
     * @param day get request param for interval.
     * @return counts with their interval date that they belong to.
     */
    @GetMapping("/filledFormCountWithoutTask")
    public ResponseEntity<?> formCountWithoutTask(
            @RequestParam(name = "day", required = false) String day) {
        return new ResponseEntity<>(
                dashboardService.reportFilledForms(Integer.parseInt(day)), HttpStatus.OK);
    }

    /**
     * Get currently active(not soft deleted) user count.
     *
     * @return active user count.
     */
    @GetMapping("/activeUsers")
    public ResponseEntity<?> activeUsers() {
        Map<String, Long> response = new HashMap<>();
        response.put("count", userService.getActiveUserCount());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get currently active(not soft deleted) form count.
     *
     * @return active form count.
     */
    @GetMapping("/activeForms")
    public ResponseEntity<?> activeForms() {
        Map<String, Long> response = new HashMap<>();
        response.put("count", applicationVersionService.countOfNotDeletedApplications());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
