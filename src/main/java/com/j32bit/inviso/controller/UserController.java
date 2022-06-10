package com.j32bit.inviso.controller;

import com.j32bit.inviso.domain.User;
import com.j32bit.inviso.dto.UserDto;
import com.j32bit.inviso.dto.request.UserLoginRequestDto;
import com.j32bit.inviso.dto.request.UserRegistrationRequestDto;
import com.j32bit.inviso.dto.request.WithSpecRequestDto;
import com.j32bit.inviso.service.AuthenticationService;
import com.j32bit.inviso.service.UserService;
import com.j32bit.inviso.shared.SearchSpecification;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    // {"filterRequest":[{"fieldName":"name","value":"deneme"},{"fieldName":"surname","value":"deneme1"}],"offset":0,"order":"ASC","limit":5}
    /**
     * Get all users with specification.
     *
     * @param withSpecRequestDto request body that contains query filters,
     *                           paging information and sorting information.
     * @return All users that match the given requirements
     */
    @PostMapping("/getAllWithSpec")
    public ResponseEntity<Page<UserDto>> getAllWithSpec(@RequestBody WithSpecRequestDto withSpecRequestDto) {
        return new ResponseEntity<>(userService.findAll(withSpecRequestDto), HttpStatus.OK);
    }

    // {"data":{"name":"deneme","surname":"deneme","tcNumber":"11111111111","userName":"deneme","companyName":"deneme","occupation":"deneme","email":"deneme@deneme.com","address":"deneme","phoneNumber":"(999) 999-9999"},"serverURI":"http://natilus.invisoapp.com.tr/admin","userName":"sau"}
    @PostMapping("/create")
    public ResponseEntity<UserDto> create(@RequestBody UserRegistrationRequestDto userRegistrationRequestDto) {
        return new ResponseEntity<>(userService.save(userRegistrationRequestDto), HttpStatus.CREATED);
    }

    // {"data":{"id":5,"email":"deneme@deneme.com","name":"deneme","surname":"deneme1","userName":"deneme","password":null,"tcNumber":"11111111111","companyName":"deneme","occupation":"deneme","phoneNumber":"(999) 999-9999","address":"deneme","isAdmin":0,"status":0,"roles":[{"id":2,"roleName":"USER","shortName":"USR"}]},"userName":"sau"}
    @PutMapping("/update")
    public ResponseEntity<UserDto> update(@RequestBody UserRegistrationRequestDto userRegistrationRequestDto) {
        return new ResponseEntity<>(userService.update(userRegistrationRequestDto), HttpStatus.OK);
    }

    // {"id":5,"userName":"sau"}
    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestBody UserDto userDto) {
        userService.delete(userDto);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    // {"username": "admin32", "password": "password"}
    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        return new ResponseEntity<>(authenticationService.authenticate(userLoginRequestDto), HttpStatus.OK);
    }
}
