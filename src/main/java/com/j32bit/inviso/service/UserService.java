package com.j32bit.inviso.service;

import com.j32bit.inviso.domain.User;
import com.j32bit.inviso.dto.UserDto;
import com.j32bit.inviso.dto.request.UserRegistrationRequestDto;
import com.j32bit.inviso.dto.request.WithSpecRequestDto;
import com.j32bit.inviso.exception.InvisoException;
import com.j32bit.inviso.repository.UserRepository;
import com.j32bit.inviso.shared.SearchSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.Session;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserService {
    private final EntityManager entityManager;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    // it returns domain not dto because it's protected so it can be only used between services and not in controller
    protected User findByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found in database!"));
    }

    public Page<UserDto> findAll(WithSpecRequestDto withSpecRequestDto) {
        Session session = entityManager.unwrap(Session.class);
        SearchSpecification<User> searchSpecification =
                new SearchSpecification<User>(withSpecRequestDto.getFilterRequest());

        Sort sort = withSpecRequestDto.getOrder().equals("ASC") ?
                Sort.by(Sort.Direction.ASC, "id") : Sort.by(Sort.Direction.DESC, "id");

        final int page = withSpecRequestDto.getOffset() / withSpecRequestDto.getLimit();

        Pageable pageable = PageRequest.of(page, withSpecRequestDto.getLimit(), sort);

        return userRepository
                .findAll(searchSpecification, pageable)
                .map(e -> modelMapper.map(e, UserDto.class));
    }

    public UserDto save(UserRegistrationRequestDto userRegistrationRequestDto) {
        User user = modelMapper.map(userRegistrationRequestDto, User.class);
        return modelMapper.map(userRepository.save(user), UserDto.class);
    }

    public UserDto update(UserRegistrationRequestDto userRegistrationRequestDto) {
        if (userRegistrationRequestDto.getId() == null) {
            throw new InvisoException("Please provide an id to update an existing record.");
        }
        return this.save(userRegistrationRequestDto);
    }

    public void delete(UserDto userDto) {
        User user = modelMapper.map(userDto, User.class);
        userRepository.delete(user);
    }
}
