package com.j32bit.inviso.controller;

import com.j32bit.inviso.dto.UserDto;
import com.j32bit.inviso.dto.request.SaveRequestBaseDto;
import com.j32bit.inviso.service.ApplicationService;
import com.j32bit.inviso.service.UserApplicationService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/api/userApplication")
public class UserApplicationController {

    private final UserApplicationService userApplicationService;

    @PostMapping("/getAssignedUsersOfApplication")
    public ResponseEntity<List<UserDto>> getAssignedUsersOfApplication(@RequestBody Long applicationId) {
        return new ResponseEntity<>(userApplicationService.getAssignedUsersOfApplication(applicationId), HttpStatus.OK);
    }

    @PostMapping("/saveUserApplication")
    public ResponseEntity<?> saveUserApplication(@RequestBody SaveRequestBaseDto<List<UserDto>> saveRequestBaseDto) {
        return new ResponseEntity<>(userApplicationService.saveUserApplication(saveRequestBaseDto), HttpStatus.OK);
    }
}
