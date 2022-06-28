package com.j32bit.inviso.controller;

import com.j32bit.inviso.dto.request.FormDataSaveRequestDto;
import com.j32bit.inviso.dto.request.WithSpecRequestDto;
import com.j32bit.inviso.dto.response.InvisoPageable;
import com.j32bit.inviso.service.ApplicationVersionService;
import com.j32bit.inviso.service.ControlMetadataService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller which contains endpoints
 * that are related to form submitting.
 */
@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/api/entry")
public class ApplicationEntryController {

    private final ControlMetadataService controlMetadataService;

    /**
     * Save submitted form data.
     *
     * @param formDataSaveRequestDto submit payload.
     * @return success message.
     */
    @PostMapping("/sendFormData")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> sendFormData(
            @RequestBody FormDataSaveRequestDto formDataSaveRequestDto) {
        controlMetadataService.saveFormData(formDataSaveRequestDto);

        Map<String, Object> response = new HashMap<>();
        response.put("status", true);
        response.put("message", "Form data successfully saved.");
        response.put("error", null);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Get all submitted form data with spec.
     *
     * @param withSpecRequestDto specifications.
     * @return {@link FormDataSaveRequestDto} as {@link InvisoPageable}.
     */
    @PostMapping("/getAllControlMetadata")
    @PreAuthorize("hasAnyRole('ADMIN', 'REPORTER')")
    public ResponseEntity<InvisoPageable<FormDataSaveRequestDto>> getAllControlMetadataWithSpec(
            @RequestBody WithSpecRequestDto withSpecRequestDto) {
        return new ResponseEntity<>(
                controlMetadataService.getAllControlMetadataWithSpec(withSpecRequestDto),
                HttpStatus.OK);
    }

}
