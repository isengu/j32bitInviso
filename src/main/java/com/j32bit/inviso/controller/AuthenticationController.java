package com.j32bit.inviso.controller;

import com.j32bit.inviso.service.AuthenticationService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    /**
     * Authenticate user, if correct return jwt token.
     * <br><br>
     * Request body sample:
     * <br>
     * <code>
     *     client_id=mfc&client_secret=secret&grant_type=password&
     *     password=2405c79d70f52098b0647f79e96616d8&username=sau
     * </code>
     *
     * @param username username credential.
     * @param password password credential.
     * @return JWT token
     */
    @PostMapping("/token")
    public ResponseEntity<?> token(@RequestParam("username") String username,
                                   @RequestParam("password") String password) {
        Map<String, String> response = new HashMap<>();
        response.put("access_token", authenticationService.authenticate(username, password));
        response.put("token_type", "bearer");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * If the request passes the security filter it reaches here
     * and returns true. Otherwise if it didn't pass the filter
     * exception is thrown.
     *
     * @return true
     */
    @GetMapping("/checkAuth")
    public ResponseEntity<Boolean> checkAuth() {
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

}
