package com.j32bit.inviso.service;

import com.j32bit.inviso.dto.RoleDto;
import com.j32bit.inviso.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;

    public List<RoleDto> getAllRole() {
        return roleRepository.findAll()
                .stream()
                .map(e -> modelMapper.map(e, RoleDto.class))
                .collect(Collectors.toList());
    }
}
