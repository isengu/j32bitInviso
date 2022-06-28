package com.j32bit.inviso.service;

import com.j32bit.inviso.exception.InvisoException;
import com.j32bit.inviso.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthenticationService {

    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    private final InvisoUserDetailsService invisioUserDetailsService;

    /**
     * Authenticate and return token.
     *
     * @param username username.
     * @param password password.
     * @return JWT token.
     */
    public String authenticate(String username, String password) {
        final Authentication authentication;

        try {
            authentication = authenticateToken(username, password);
        } catch (BadCredentialsException e) {
            throw new InvisoException(
                    HttpStatus.NOT_FOUND,
                    "Invalid Credentials",
                    "Invalid authentication credentials for user: " + username);
        } catch (Exception e) {
            throw new InvisoException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error",
                    e.getMessage());
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtTokenUtil.generateToken(username);
    }

    /**
     * Authenticate for given username and password.
     *
     * @param username username.
     * @param password password.
     * @return {@link Authentication}.
     */
    private Authentication authenticateToken(String username, String password) {

        log.info("Authenticating for user: {}", username);

        final UserDetails storedUserDetails = invisioUserDetailsService
                .loadUserByUsername(username);

        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        storedUserDetails,
                        password,
                        storedUserDetails.getAuthorities()
                ));
    }

}
