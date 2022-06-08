package com.j32bit.inviso.service;

import com.j32bit.inviso.dto.request.UserLoginRequestDto;
import com.j32bit.inviso.exception.InvisoException;
import com.j32bit.inviso.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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

    public String authenticate(UserLoginRequestDto userLoginRequestDto) {
        final Authentication authentication;

        try {
            authentication = authenticateToken(userLoginRequestDto);
        } catch (DisabledException e) {
            throw new InvisoException("User is disabled!");
        } catch (BadCredentialsException e) {
            throw new InvisoException("Invalid credentials!");
        } catch (Exception e) {
            throw new InvisoException(e.getMessage());
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtTokenUtil.generateToken(userLoginRequestDto.getUsername());
    }

    private Authentication authenticateToken(UserLoginRequestDto userLoginRequestDTO) {

        log.info("Authenticating for user: {}", userLoginRequestDTO.getUsername());

        final UserDetails storedUserDetails = invisioUserDetailsService
                .loadUserByUsername(userLoginRequestDTO.getUsername());

        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        storedUserDetails,
                        userLoginRequestDTO.getPassword(),
                        storedUserDetails.getAuthorities()
                ));
    }

}
