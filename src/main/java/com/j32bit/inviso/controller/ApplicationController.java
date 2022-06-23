package com.j32bit.inviso.controller;

import com.j32bit.inviso.dto.UserDto;
import com.j32bit.inviso.dto.request.SaveRequestBaseDto;
import com.j32bit.inviso.service.ApplicationService;
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
@RequestMapping("/api/application")
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping("/getAllComponents")
    public ResponseEntity<?> getAllComponents() {
        return new ResponseEntity<>(applicationService.getAllComponents(), HttpStatus.OK);
    }

    @GetMapping("/getAllOptionTypes")
    public ResponseEntity<?> getAllOptionTypes() {
        return new ResponseEntity<>(applicationService.getAllOptionTypes(), HttpStatus.OK);
    }

    @GetMapping("/getAllValidations")
    public ResponseEntity<?> getAllValidations() {
        return new ResponseEntity<>(applicationService.getAllValidations(), HttpStatus.OK);
    }

    @GetMapping(value = "/getAllEvents", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllEvents() {
        String response =
                "[{\"id\":3,\"type\":\"ng-init\",\"description\":null,\"selectable\":true,\"functions\":null}," +
                "{\"id\":1,\"type\":\"ng-click\",\"description\":null,\"selectable\":true,\"functions\":null}," +
                "{\"id\":4,\"type\":\"ng-show\",\"description\":null,\"selectable\":true,\"functions\":null}," +
                "{\"id\":5,\"type\":\"ng-hide\",\"description\":null,\"selectable\":true,\"functions\":null}," +
                "{\"id\":2,\"type\":\"change\",\"description\":null,\"selectable\":true,\"functions\":null}]";

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "/getAllFunctionTypes", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllFunctionTypes() {
        String response = "[{\"id\":2,\"name\":\"USER_DEFINED_FUNCTIONS\",\"value\":\"2\"}," +
                "{\"id\":1,\"name\":\"STATIC_FUNCTIONS\",\"value\":\"1\"}," +
                "{\"id\":3,\"name\":\"Navigation Functions\",\"value\":\"3\"}]";

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "/getInputTypes", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllInputTypes() {
        String response = "[{\"id\":7,\"key\":\"INPUT_TYPE\",\"value\":\"number\"}," +
                "{\"id\":8,\"key\":\"INPUT_TYPE\",\"value\":\"search\"}," +
                "{\"id\":9,\"key\":\"INPUT_TYPE\",\"value\":\"month\"}," +
                "{\"id\":10,\"key\":\"INPUT_TYPE\",\"value\":\"password\"}," +
                "{\"id\":11,\"key\":\"INPUT_TYPE\",\"value\":\"range\"}," +
                "{\"id\":12,\"key\":\"INPUT_TYPE\",\"value\":\"datetime-local\"}," +
                "{\"id\":13,\"key\":\"INPUT_TYPE\",\"value\":\"week\"}," +
                "{\"id\":14,\"key\":\"INPUT_TYPE\",\"value\":\"time\"}," +
                "{\"id\":15,\"key\":\"INPUT_TYPE\",\"value\":\"mail\"}," +
                "{\"id\":16,\"key\":\"INPUT_TYPE\",\"value\":\"text\"}," +
                "{\"id\":17,\"key\":\"INPUT_TYPE\",\"value\":\"date\"}," +
                "{\"id\":18,\"key\":\"INPUT_TYPE\",\"value\":\"tel\"}]";

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "/getAllFunctions", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllFunctions() {
        String response = "[{\"id\":1,\"description\":\"submit\",\"functionDetail\":\"submit(false)\"," +
                "\"applicationId\":17,\"functionType\":{\"id\":1,\"name\":\"STATIC_FUNCTIONS\",\"value\":\"1\"}}," +
                "{\"id\":2,\"description\":\"saveAsDraft\",\"functionDetail\":\"submit(true)\",\"applicationId\":17," +
                "\"functionType\":{\"id\":1,\"name\":\"STATIC_FUNCTIONS\",\"value\":\"1\"}}]";

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(value = "/getAllDatasource", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllDatasource() {
        return new ResponseEntity<>("{\"objList\":[], \"totalSize\": 0}", HttpStatus.OK);
    }

}
