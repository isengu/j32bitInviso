package com.j32bit.inviso.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return Optional.of(SecurityContextHolder.getContext().getAuthentication().getName());
    }
}