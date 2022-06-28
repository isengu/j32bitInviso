package com.j32bit.inviso.controller;

import com.j32bit.inviso.dto.RoleDto;
import com.j32bit.inviso.service.RoleService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/api/role")
public class RoleController {

    private final RoleService roleService;

    /**
     * Get all roles that can be given to a user.
     *
     * @return {@link List} of {@link RoleDto}s.
     */
    @GetMapping("/getAllRole")
    public ResponseEntity<List<RoleDto>> getAllRole() {
        return new ResponseEntity<>(roleService.getAllRole(), HttpStatus.OK);
    }

}
