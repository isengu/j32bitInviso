package com.j32bit.inviso.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Log4j2
@RequiredArgsConstructor
public class InvisoDaoAuthenticationProvider extends DaoAuthenticationProvider {

    @Override
    protected void additionalAuthenticationChecks(
            UserDetails userDetails,
            UsernamePasswordAuthenticationToken authentication)
            throws AuthenticationException {

        try {

            super.additionalAuthenticationChecks(userDetails, authentication);

        } catch (BadCredentialsException e) {

            log.info("Login attempt on username: {} from Client IP: {} Server IP: {}", userDetails.getUsername(), remoteAddress(), localAddress());
            throw new BadCredentialsException("action.Login.js.msg.wrongPassword");

        }

    }

    public static String remoteAddress() {

        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getRemoteAddr();
    }


    public static String localAddress() {

        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getLocalAddr();
    }

}
