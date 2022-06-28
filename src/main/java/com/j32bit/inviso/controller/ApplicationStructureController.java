package com.j32bit.inviso.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.j32bit.inviso.dto.ApplicationDto;
import com.j32bit.inviso.dto.request.ApplicationReqResConverter;
import com.j32bit.inviso.dto.request.ApplicationReqResDto;
import com.j32bit.inviso.dto.request.WithSpecRequestDto;
import com.j32bit.inviso.dto.response.ApplicationStructureNameDto;
import com.j32bit.inviso.dto.response.InvisoPageable;
import com.j32bit.inviso.service.ApplicationVersionService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/api/structure")
public class ApplicationStructureController {

    private final ApplicationVersionService applicationVersionService;
    private final ObjectMapper objectMapper;
    private final ModelMapper modelMapper;

    /**
     * Get all applications last versions as list.
     *
     * @return {@link List} of {@link ApplicationReqResDto}s.
     */
    @GetMapping("/getAllApplications")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApplicationReqResDto>> getAllApplications() {
        return new ResponseEntity<>(
                applicationVersionService.getAllApplications(),
                HttpStatus.OK);
    }

    /**
     * Get structure names and ids as pageable
     * with specifications.
     *
     * @param withSpecRequestDto specification request.
     * @return {@link InvisoPageable}
     */
    @PostMapping("/getStructureNamesBySpec")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InvisoPageable<ApplicationStructureNameDto>> getStructureNamesWithSpec(
            @RequestBody WithSpecRequestDto withSpecRequestDto) {
        Page<ApplicationStructureNameDto> page =
                applicationVersionService
                        .findAllWithSpec(withSpecRequestDto)
                        .map(e -> modelMapper.map(e, ApplicationStructureNameDto.class));

        InvisoPageable<ApplicationStructureNameDto> invisoPageable = InvisoPageable.fromPage(page);

        return new ResponseEntity<>(invisoPageable, HttpStatus.OK);
    }

    /**
     * Get structure names and ids of all active(not deleted)
     * applications last versions as list.
     *
     * @return {@link List} of {@link ApplicationStructureNameDto}s.
     */
    @PostMapping("/getStructureNames")
    @PreAuthorize("hasAnyRole('ADMIN', 'REPORTER')")
    public ResponseEntity<List<ApplicationStructureNameDto>> getStructureNames() {
        return new ResponseEntity<>(
                applicationVersionService.getStructureNames(),
                HttpStatus.OK);
    }

    /**
     * Get structure names and ids of applications
     * that are appointed to given user.
     *
     * @param username username.
     * @return {@link List} of {@link ApplicationStructureNameDto}s.
     */
    @PostMapping("/getStructureNamesofUser")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ApplicationStructureNameDto>> getStructureNamesOfUser(
            @RequestBody String username) {
        return new ResponseEntity<>(
                applicationVersionService.getStructureNamesOfUser(username),
                HttpStatus.OK);
    }

    /**
     * Get applications last version structure
     * with given application id.
     *
     * @param json contains applicationId.
     * @return {@link List} of {@link ApplicationReqResDto}s.
     * @throws JsonProcessingException
     */
    @PostMapping("/getStructure")
    @PreAuthorize("hasAnyRole('ADMIN', 'REPORTER', 'SUPERVISOR', 'USER')")
    public ResponseEntity<List<ApplicationReqResDto>> getStructure(@RequestBody String json)
            throws JsonProcessingException {
        JsonNode jsonNode = objectMapper.readTree(json);
        ApplicationReqResDto response =
                applicationVersionService.getLastVersion(jsonNode.get("applicationId").asLong());

        List<ApplicationReqResDto> list = new ArrayList<>();
        list.add(response);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /**
     * Get specific application version structure
     * by given application id and version.
     *
     * @param request json contains application id and version.
     * @return {@link ApplicationReqResDto}.
     */
    @PostMapping("/getApplicationStructure")
    @PreAuthorize("hasAnyRole('ADMIN', 'REPORTER')")
    public ResponseEntity<ApplicationReqResDto> getApplicationStructure(@RequestBody Map<String, BigDecimal> request) {
        return new ResponseEntity<>(
                ApplicationReqResConverter.toResponse(
                        applicationVersionService.getVersionOfApplication(
                        request.get("applicationId").longValue(),
                        request.get("version"))),
                HttpStatus.OK);
    }

    /**
     * Save application structure.
     *
     * @param json application structure as
     *             json string.
     * @return saved application as {@link ApplicationReqResDto}.
     */
    @PostMapping("/saveAnApplication")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApplicationReqResDto> saveAnApplication(@RequestBody String json) {
        return new ResponseEntity<>(
                applicationVersionService.save(json),
                HttpStatus.OK);
    }

    /**
     * Save application structure.
     *
     * @param json application structure as
     *             json string.
     * @return id of recently saved application.
     */
    @PostMapping("/saveStructure")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Long> saveStructure(@RequestBody String json) {
        return new ResponseEntity<>(
                applicationVersionService.save(json).getId(),
                HttpStatus.OK);
    }

    /**
     * Delete(soft delete) application.
     *
     * @param request contains shortname of
     *                application to be deleted.
     * @return null.
     */
    @Transactional
    @PostMapping("/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteStructure(@RequestBody Map<String, String> request) {
        applicationVersionService.delete(request.get("shortName"));
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
