package com.j32bit.inviso.controller;

import com.j32bit.inviso.dto.request.ApplicationReqResConverter;
import com.j32bit.inviso.dto.request.FormDataSaveRequestDto;
import com.j32bit.inviso.dto.request.WithSpecRequestDto;
import com.j32bit.inviso.service.ApplicationVersionService;
import com.j32bit.inviso.service.ControlMetadataService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/api/entry")
public class ApplicationEntryController {

    private final ControlMetadataService controlMetadataService;
    private final ApplicationVersionService applicationVersionService;

    @PostMapping("/sendFormData")
    public ResponseEntity<?> sendFormData(@RequestBody FormDataSaveRequestDto formDataSaveRequestDto) {
        return new ResponseEntity<>(controlMetadataService.saveFormData(formDataSaveRequestDto), HttpStatus.OK);
    }

    @PostMapping("/getAllControlMetadata")
    public ResponseEntity<?> getAllControlMetadataWithSpec(@RequestBody WithSpecRequestDto withSpecRequestDto) {
        return new ResponseEntity<>(
                controlMetadataService.getAllControlMetadataWithSpec(withSpecRequestDto),
                HttpStatus.OK);
    }

    @PostMapping("/getApplicationStructure")
    public ResponseEntity<?> getApplicationStructure(@RequestBody Map<String, BigDecimal> request) {
        return new ResponseEntity<>(
                ApplicationReqResConverter.toResponse(
                        applicationVersionService.getVersionOfApplication(
                        request.get("applicationId").longValue(),
                        request.get("version"))),
                HttpStatus.OK);
    }
}
