package com.j32bit.inviso.controller;

import com.j32bit.inviso.dto.UserDto;
import com.j32bit.inviso.dto.request.SaveRequestBaseDto;
import com.j32bit.inviso.service.UserApplicationService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/api/userApplication")
public class UserApplicationController {

    private final UserApplicationService userApplicationService;

    /**
     * Get users appointed to given application.
     *
     * @param applicationId application id.
     * @return {@link List} of {@link UserDto}s.
     */
    @PostMapping("/getAssignedUsersOfApplication")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAssignedUsersOfApplication(
            @RequestBody Long applicationId) {
        return new ResponseEntity<>(
                userApplicationService.getAssignedUsersOfApplication(applicationId),
                HttpStatus.OK);
    }

    /**
     * Appoint users to application for users to fill and submit the form.
     *
     * @param saveRequestBaseDto {@link SaveRequestBaseDto}.
     * @return {@link SaveRequestBaseDto}.
     */
    @PostMapping("/saveUserApplication")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveUserApplication(
            @RequestBody SaveRequestBaseDto<List<UserDto>> saveRequestBaseDto) {
        return new ResponseEntity<>(
                userApplicationService.saveUserApplication(saveRequestBaseDto),
                HttpStatus.OK);
    }
}
