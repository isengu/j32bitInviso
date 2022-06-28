package com.j32bit.inviso.service;

import com.j32bit.inviso.domain.Application;
import com.j32bit.inviso.domain.User;
import com.j32bit.inviso.dto.UserDto;
import com.j32bit.inviso.dto.request.SaveRequestBaseDto;
import com.j32bit.inviso.exception.InvisoException;
import com.j32bit.inviso.repository.ApplicationRepository;
import com.j32bit.inviso.repository.UserApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserApplicationRepository userApplicationRepository;
    private final ModelMapper modelMapper;

    /**
     * Get all users assigned to given application.
     *
     * @param applicationId application id.
     * @return {@link List} of {@link UserDto}s.
     */
    public List<UserDto> getAssignedUsersOfApplication(Long applicationId) {
        return userApplicationRepository
                .getAssignedUsersOfApplication(applicationId)
                .stream().map(e -> modelMapper.map(e, UserDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Assign application to user(s).
     *
     * @param saveRequestBaseDto request.
     * @return assigned {@link Application}.
     */
    public Application saveUserApplication(SaveRequestBaseDto<List<UserDto>> saveRequestBaseDto) {
        Application application = applicationRepository
                .findById(saveRequestBaseDto.getApplicationId())
                .orElseThrow(() -> new InvisoException(
                        HttpStatus.NOT_FOUND,
                        "Application Not Found",
                        "Application not found with id: " + saveRequestBaseDto.getApplicationId()));

        List<User> users = saveRequestBaseDto.getData()
                .stream()
                .map(e -> modelMapper.map(e, User.class))
                .collect(Collectors.toList());

        application.setUsers(users);

        return applicationRepository.save(application);
    }

}
