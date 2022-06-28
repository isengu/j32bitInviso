package com.j32bit.inviso.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.j32bit.inviso.domain.User;
import com.j32bit.inviso.dto.UserDto;
import com.j32bit.inviso.dto.request.WithSpecRequestDto;
import com.j32bit.inviso.enums.SearchOperation;
import com.j32bit.inviso.exception.InvisoException;
import com.j32bit.inviso.repository.UserRepository;
import com.j32bit.inviso.utils.SearchCriteria;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.Filter;
import org.hibernate.Session;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserService {
    private final EntityManager entityManager;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    /**
     * Find user with the given username.
     *
     * @param username the given username.
     * @return {@link UserDto} of requested user.
     */
    public UserDto findByUsername(String username) {
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedUserFilter");
        filter.setParameter("status", (byte) 0);

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User " + username + " not found in database!"));

        session.disableFilter("deletedUserFilter");

        return modelMapper.map(user, UserDto.class);
    }

    /**
     * Find all users that match given criterias.
     *
     * @param withSpecRequestDto request body that contains specifications.
     * @return {@link Page} containing {@link UserDto}s.
     */
    public Page<UserDto> findAllWithSpec(WithSpecRequestDto withSpecRequestDto) {
        Set<SearchCriteria> criterias = withSpecRequestDto.getFilterRequest();

        // if "status=1"(deleted) isn't specified always add "status=0"(not deleted) creteria
        if (!criterias.contains(new SearchCriteria("status", "1", null))) {
            criterias.add(new SearchCriteria("status", "0", SearchOperation.EQUAL));
        }

        SearchSpecification<User> searchSpecification =
                new SearchSpecification<>(criterias);

        Sort sort = withSpecRequestDto.getOrder().equals("ASC") ?
                Sort.by(Sort.Direction.ASC, "id") : Sort.by(Sort.Direction.DESC, "id");

        int pageNumber = withSpecRequestDto.getOffset() / withSpecRequestDto.getLimit();

        Pageable pageable = PageRequest.of(pageNumber, withSpecRequestDto.getLimit(), sort);

        Page<User> page = userRepository.findAll(searchSpecification, pageable);

        return page.map(e -> modelMapper.map(e, UserDto.class));
    }

    /**
     * Find all users.
     *
     * @return List of {@link UserDto}s
     */
    public List<UserDto> findAll() {
        return userRepository
                .findAll()
                .stream()
                .map(e -> modelMapper.map(e, UserDto.class))
                .collect(Collectors.toList());
    }

    /**
     * Register a new user.
     *
     * @param userDto contains new user's information.
     * @return {@link UserDto} of newly saved user.
     */
    public UserDto save(UserDto userDto) {
        User user = modelMapper.map(userDto, User.class);

        if (user.getPassword() != null && user.getId() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else if (user.getId() == null) {
            user.setPassword(passwordEncoder.encode("2405c79d70f52098b0647f79e96616d8"));
        }

        return modelMapper.map(userRepository.save(user), UserDto.class);
    }

    /**
     * Update an existing user.
     *
     * @param userDto contains existing user's id and
     *                other fields that's gonna be updated.
     * @return {@link UserDto} of updated user.
     */
    public UserDto update(UserDto userDto) {
        if (userDto.getId() == null) {
            throw new InvisoException(
                    HttpStatus.BAD_REQUEST,
                    "No Id Provided",
                    "Please provide id of the record you want to update.",
                    "No id provided for the record to be updated.");
        }

        // get user with the id from database
        User existingUser = userRepository.findById(userDto.getId())
                .orElseThrow(() ->
                        new InvisoException(
                                HttpStatus.NOT_FOUND,
                                "User Not Found",
                                "User not found with id: " + userDto.getId()));

        try {
            // merge fields of existing user and given user
            User updatedUser = objectMapper.readerForUpdating(existingUser)
                    .readValue(objectMapper.writeValueAsString(userDto));

            // save the merged user
            return this.save(modelMapper.map(updatedUser, UserDto.class));
        } catch (JsonProcessingException e) {
            throw new InvisoException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Json Processing Error",
                    e.getLocalizedMessage(),
                    e.getLocalizedMessage() + " occured. Original message: " +
                            e.getOriginalMessage() + ". Location: " + e.getLocation());
        }
    }

    /**
     * Delete (soft delete) an existing user.
     *
     * @param userDto contains id of user to be deleted.
     */
    public void delete(UserDto userDto) {
        userRepository.deleteById(userDto.getId());
    }

    /**
     * Get count of active(not deleted) users.
     *
     * @return count of active users.
     */
    public long getActiveUserCount() {
        Set<SearchCriteria> criterias = new HashSet<>();
        // status=0 means active users, not deleted(soft delete)
        criterias.add(new SearchCriteria("status", "0", SearchOperation.EQUAL));

        SearchSpecification<User> searchSpecification = new SearchSpecification<>(criterias);

        return userRepository.count(searchSpecification);
    }
}
