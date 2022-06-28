package com.j32bit.inviso.service;


import com.j32bit.inviso.dto.RoleDto;
import com.j32bit.inviso.dto.UserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class InvisoUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto user = userService.findByUsername(username);
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

        for (RoleDto role : user.getRoles()) {
            log.debug("loadUserByUsername: user: " + user.getUsername() + " role: " + role.getRoleName());
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_"+role.getRoleName()));
        }

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                grantedAuthorities);
    }
}