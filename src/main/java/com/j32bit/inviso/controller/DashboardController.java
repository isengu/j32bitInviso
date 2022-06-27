package com.j32bit.inviso.controller;

import com.j32bit.inviso.dto.response.DashboardReportResponseDto;
import com.j32bit.inviso.service.ControlMetadataService;
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

    @GetMapping("/filledFormCountWithoutTask")
    public ResponseEntity<?> formCountWithoutTask(
            @RequestParam(name = "day", required = false) String day) {
        return new ResponseEntity<>(dashboardService.reportFilledForms(Integer.parseInt(day)), HttpStatus.OK);
    }

    @GetMapping("/activeUsers")
    public ResponseEntity<?> activeUsers() {
        Map<String, Long> response = new HashMap<>();
        response.put("count", userService.getActiveUserCount());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/activeTasks")
    public ResponseEntity<?> activeTasks() {
        Map<String, Integer> response = new HashMap<>();
        response.put("count", 0);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
