package com.j32bit.inviso.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.j32bit.inviso.dto.ApplicationVersionDto;
import com.j32bit.inviso.dto.ApplicationDto;
import com.j32bit.inviso.dto.request.ApplicationReqResDto;
import com.j32bit.inviso.dto.request.WithSpecRequestDto;
import com.j32bit.inviso.dto.response.ApplicationStructureNameDto;
import com.j32bit.inviso.service.ApplicationVersionService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/getStructureNamesBySpec")
    public ResponseEntity<?> getStructureNamesBySpec(@RequestBody WithSpecRequestDto withSpecRequestDto) {
        Page<ApplicationStructureNameDto> page =
                applicationVersionService.getStructureNamesWithSpec(withSpecRequestDto);

        Map<String, Object> response = new HashMap<>();
        response.put("objList", page.getContent());
        response.put("totalSize", page.getTotalElements());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/getStructureNames")
    public ResponseEntity<?> getStructureNames() {
        return new ResponseEntity<>(applicationVersionService.getStructureNames(), HttpStatus.OK);
    }

    @PostMapping("/getStructureNamesofUser")
    public ResponseEntity<?> getStructureNamesOfUser(@RequestBody String username) {
        return new ResponseEntity<>(applicationVersionService.getStructureNamesOfUser(username), HttpStatus.OK);
    }

    @PostMapping("/getStructure")
    public ResponseEntity<?> getStructure(@RequestBody String json) throws JsonProcessingException {
        JsonNode jsonNode = objectMapper.readTree(json);
        ApplicationReqResDto response = applicationVersionService.getLastVersion(ApplicationDto.builder()
                        .id(jsonNode.get("applicationId").asLong()).build());

        List<ApplicationReqResDto> list = new ArrayList<>();
        list.add(response);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/saveAnApplication")
    public ResponseEntity<?> saveAnApplication(@RequestBody String json) {
        return new ResponseEntity<>(applicationVersionService.save(json), HttpStatus.OK);
    }

    @PostMapping("/saveStructure")
    public ResponseEntity<?> saveStructure(@RequestBody String json) {
        return new ResponseEntity<>(applicationVersionService.save(json).getId(), HttpStatus.OK);
    }

    @PostMapping("/getAllWithSpec")
    public ResponseEntity<Page<ApplicationVersionDto>> getAllWithSpec(@RequestBody WithSpecRequestDto withSpecRequestDto) {
        return new ResponseEntity<>(applicationVersionService.findAll(withSpecRequestDto), HttpStatus.OK);
    }

}
