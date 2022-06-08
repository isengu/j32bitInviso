package com.j32bit.inviso.service;

import com.j32bit.inviso.domain.User;
import com.j32bit.inviso.exception.InvisoException;
import com.j32bit.inviso.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User findByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found in database!"));
    }

    public Page<User> findAll(int pageNumber, int pageSize) {
        return userRepository.findAll(PageRequest.of(pageNumber, pageSize));
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User update(User user) {
        if (user.getId() == null) {
            throw new InvisoException("Invalid user id.");
        }

        return this.save(user);
    }

    public void delete(User user) {
        userRepository.delete(user);
    }
}
