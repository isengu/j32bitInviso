package com.j32bit.inviso.controller;

import com.j32bit.inviso.dto.UserDto;
import com.j32bit.inviso.dto.request.PasswordChangeRequsetDto;
import com.j32bit.inviso.dto.request.SaveRequestBaseDto;
import com.j32bit.inviso.dto.request.WithSpecRequestDto;
import com.j32bit.inviso.dto.response.InvisoPageable;
import com.j32bit.inviso.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    /**
     * Get all users with specification.
     * <br><br>
     * Request body sample:
     * <pre>
     *      {"filterRequest":[{"fieldName":"name","value":"deneme"},
     *      {"fieldName":"surname","value":"deneme1"}],"offset":0,"order":"ASC","limit":5}
     * </pre>
     *
     * @param withSpecRequestDto request body that contains query filters,
     *                           paging information and sorting information.
     * @return {@link Page} that contains {@link UserDto}s of filter matched users.
     */
    @PostMapping("/getAllWithSpec")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllWithSpec(@RequestBody WithSpecRequestDto withSpecRequestDto) {
        Page<UserDto> page = userService.findAllWithSpec(withSpecRequestDto);

        InvisoPageable<?> invisoPageable = InvisoPageable.fromPage(page);

        return new ResponseEntity<>(invisoPageable, HttpStatus.OK);
    }

    /**
     * Get all users as a list.
     *
     * @return List of {@link UserDto}s
     */
    @GetMapping("/getAllUsers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    /**
     * Get user credentials of given username.
     * <br><br>
     * Request body sample:
     * <pre>
     *     user1
     * </pre>
     *
     * @param username needed user's username
     * @return {@link UserDto} of matched user.
     */
    @PostMapping("/getUserCredentials")
    public ResponseEntity<UserDto> getUserCredentials(@RequestBody String username) {
        return new ResponseEntity<>(userService.findByUsername(username), HttpStatus.OK);
    }

    /**
     * Register new user.
     * <br><br>
     * Request body sample:
     * <pre>
     *     {"data":{"name":"deneme","surname":"deneme","tcNumber":"11111111111",
     *      "userName":"deneme","companyName":"deneme","occupation":"deneme",
     *      "email":"deneme@deneme.com","address":"deneme","phoneNumber":"(999) 999-9999"},
     *      "serverURI":"http://natilus.invisoapp.com.tr/admin","userName":"sau"}
     * </pre>
     *
     * @param saveRequestBaseDto request body that contains the user's information.
     * @return {@link UserDto} of saved user.
     */
    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> create(@RequestBody SaveRequestBaseDto<UserDto> saveRequestBaseDto) {
        return new ResponseEntity<>(userService.save(saveRequestBaseDto.getData()), HttpStatus.CREATED);
    }

    /**
     * Update existing user.
     * <br><br>
     * Request body sample:
     * <pre>
     *     {"data":{"id":5,"email":"deneme@deneme.com","name":"deneme","surname":"deneme1",
     *     "userName":"deneme","password":null,"tcNumber":"11111111111","companyName":"deneme",
     *     "occupation":"deneme","phoneNumber":"(999) 999-9999","address":"deneme","isAdmin":0,
     *     "status":0,"roles":[{"id":2,"roleName":"USER","shortName":"USR"}]},"userName":"sau"}
     * </pre>
     *
     * @param saveRequestBaseDto request body that contains the user's information.
     * @return {@link UserDto} of updated user.
     */
    @PostMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> update(@RequestBody SaveRequestBaseDto<UserDto> saveRequestBaseDto) {
        return new ResponseEntity<>(userService.update(saveRequestBaseDto.getData()), HttpStatus.OK);
    }

    /**
     * Delete (soft delet) existing user.
     * <br><br>
     * Request body sample:
     * <pre>
     *     {"id":5,"userName":"sau"}
     * </pre>
     *
     * @param userDto {@link UserDto} that contains id of user that needs to be deleted.
     * @return null
     */
    @PostMapping("/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@RequestBody UserDto userDto) {
        userService.delete(userDto);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    /**
     * Change password of the user.
     * <br><br>
     * <pre>
     *     {"password": {"key": "...", "value": "..."}, "userName": "sau"}
     * </pre>
     *
     * @param passwordChangeRequsetDto password change request.
     * @return null
     */
    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequsetDto passwordChangeRequsetDto) {
        userService.changePassword(
                passwordChangeRequsetDto.getPassword().getOldPass(),
                passwordChangeRequsetDto.getPassword().getNewPass(),
                passwordChangeRequsetDto.getUserName());
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
