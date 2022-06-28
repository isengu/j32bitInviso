package com.j32bit.inviso.service;

import com.j32bit.inviso.domain.Application;
import com.j32bit.inviso.dto.ApplicationDto;
import com.j32bit.inviso.dto.FormComponentDto;
import com.j32bit.inviso.dto.FormComponentValidationDto;
import com.j32bit.inviso.dto.OptionDto;
import com.j32bit.inviso.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ModelMapper modelMapper;

    /**
     * Get all components that defined in database for front-end.
     *
     * @return {@link List} of {@link FormComponentDto}s.
     */
    public List<FormComponentDto> getAllComponents() {
        return applicationRepository.getAllComponents()
                .stream().map(e -> modelMapper.map(e, FormComponentDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Get all options that defined in database for front-end.
     *
     * @return {@link List} of {@link OptionDto}s.
     */
    public List<OptionDto> getAllOptionTypes() {
        return applicationRepository.getAllOptions()
                .stream().map(e -> modelMapper.map(e, OptionDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Get all validations that defined in database for front-end.
     *
     * @return {@link List} of {@link FormComponentValidationDto}s.
     */
    public List<FormComponentValidationDto> getAllValidations() {
        return applicationRepository.getAllValidations()
                .stream().map(e -> modelMapper.map(e, FormComponentValidationDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Save application.
     * When creating a new application first application
     * is being created than versions of this application
     * is being created.
     *
     * @param applicationDto application dto.
     * @return recently saved {@link Application}.
     */
    public Application save(ApplicationDto applicationDto) {
        return applicationRepository
                .save(modelMapper.map(applicationDto, Application.class));
    }
}
