package com.j32bit.inviso.controller;

import com.j32bit.inviso.domain.User;
import com.j32bit.inviso.dto.UserDto;
import com.j32bit.inviso.dto.request.UserLoginRequestDto;
import com.j32bit.inviso.dto.request.UserRegistrationRequestDto;
import com.j32bit.inviso.exception.InvisoException;
import com.j32bit.inviso.service.AuthenticationService;
import com.j32bit.inviso.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final ModelMapper modelMapper;
    private final AuthenticationService authenticationService;
    private final UserService userService;

    @GetMapping("/getAll/{page}/{size}")
    public ResponseEntity<Page<UserDto>> getAll(@PathVariable(value = "page") int page, @PathVariable("size") int size) {
        log.info("pagesize = " + page + " - " + size);
        Page<UserDto> userDtos = userService
                .findAll(page, size)
                .map(e -> modelMapper.map(e, UserDto.class));

        return new ResponseEntity<>(userDtos, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody UserRegistrationRequestDto userRegistrationRequestDto) {
        // convert dto to entity
        User userRequest = modelMapper.map(userRegistrationRequestDto, User.class);
        // save user
        User user = userService.save(userRequest);
        // convert entity to dto
        UserDto userResponse = modelMapper.map(user, UserDto.class);

        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
    }

    // incoming request body includes user id
    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody UserDto userDto) {
        User userRequest = modelMapper.map(userDto, User.class);
        User user = userService.update(userRequest);
        UserDto userResponse = modelMapper.map(user, UserDto.class);

        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    // incoming request body includes user id
    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestBody UserDto userDto) {
        User userRequest = modelMapper.map(userDto, User.class);
        userService.delete(userRequest);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        return new ResponseEntity<>(authenticationService.authenticate(userLoginRequestDto), HttpStatus.OK);
    }
}
