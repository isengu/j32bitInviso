package com.j32bit.inviso.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.j32bit.inviso.domain.User;
import com.j32bit.inviso.dto.UserDto;
import com.j32bit.inviso.exception.InvisoException;
import com.j32bit.inviso.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.EntityManager;
import java.lang.reflect.Executable;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Spy
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Spy
    private ModelMapper modelMapper = new ModelMapper();
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserService userService;

    @Test
    public void whenSaveNewUser_shouldReturnUserDto() {
        User user = new User();
        user.setUsername("username");
        user.setRoles(new ArrayList<>());

        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setId(user.getId());
        userDto.setRoles(new ArrayList<>());

        UserDto request = UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .roles(userDto.getRoles())
                .build();

        lenient().when(passwordEncoder.encode(anyString())).then(AdditionalAnswers.returnsFirstArg());
        lenient().when(userRepository.save(any())).thenReturn(user);
        lenient().when(userRepository.existsByUsername(any())).thenReturn(false);
        lenient().when(userRepository.existsByEmail(any())).thenReturn(false);

        UserDto actual = userService.save(request);

        assertEquals(request, actual);
    }

    @Test
    public void whenSaveNewUserWithExistingUsername_shouldThrowException() {
        User user = new User();
        user.setUsername("username");

        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setId(user.getId());

        UserDto request = UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();

        lenient().when(passwordEncoder.encode(anyString())).then(AdditionalAnswers.returnsFirstArg());
        lenient().when(userRepository.save(any())).thenReturn(user);
        lenient().when(userRepository.existsByUsername(any())).thenReturn(true);
        lenient().when(userRepository.existsByEmail(any())).thenReturn(false);

        assertThrows(InvisoException.class, () -> userService.save(request));
    }

    @Test
    public void whenSaveNewUserWithExistingEmail_shouldThrowException() {
        User user = new User();
        user.setUsername("username");

        UserDto userDto = new UserDto();
        userDto.setUsername(user.getUsername());
        userDto.setId(user.getId());

        UserDto request = UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();

        lenient().when(passwordEncoder.encode(anyString())).then(AdditionalAnswers.returnsFirstArg());
        lenient().when(userRepository.save(any())).thenReturn(user);
        lenient().when(userRepository.existsByUsername(any())).thenReturn(false);
        lenient().when(userRepository.existsByEmail(any())).thenReturn(true);

        assertThrows(InvisoException.class, () -> userService.save(request));
    }

    @Test
    public void whenUpdateUserWithValidIdAndNotExistingUsernameEmail_shouldReturnUserDto() {
        User user = new User();
        user.setId(1L);
        user.setUsername("username");
        user.setEmail("abc@abc.com");

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());

        UserDto request = UserDto.builder()
                .id(user.getId())
                .email("abcdefg@abc.com")
                .username(user.getUsername())
                .build();

        lenient().when(passwordEncoder.encode(anyString())).then(AdditionalAnswers.returnsFirstArg());
        lenient().when(userRepository.save(any())).then(AdditionalAnswers.returnsFirstArg());
        lenient().when(userRepository.existsByUsername(any())).thenReturn(false);
        lenient().when(userRepository.existsByEmail(any())).thenReturn(false);
        lenient().when(userRepository.findById(any())).thenReturn(Optional.of(user));

        UserDto actual = userService.update(request);

        assertEquals(request, actual);
    }

    @Test
    public void whenUpdateUserWithInvalidIdAndNotExistingUsernameEmail_shouldThrowException() {
        User user = new User();
        user.setId(1L);
        user.setUsername("username");
        user.setEmail("abc@abc.com");

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());

        UserDto request = UserDto.builder()
                .id(2L)
                .email("abcdefg@abc.com")
                .username(user.getUsername())
                .build();

        lenient().when(passwordEncoder.encode(anyString())).then(AdditionalAnswers.returnsFirstArg());
        lenient().when(userRepository.save(any())).then(AdditionalAnswers.returnsFirstArg());
        lenient().when(userRepository.existsByUsername(any())).thenReturn(false);
        lenient().when(userRepository.existsByEmail(any())).thenReturn(false);
        lenient().when(userRepository.findById(any())).thenReturn(Optional.empty());

        assertThrows(InvisoException.class, () -> userService.update(request));
    }

    @Test
    public void whenUpdateUserWithValidIdAndExistingUsernameEmail_shouldThrowException() {
        User user = new User();
        user.setId(1L);
        user.setUsername("username");
        user.setEmail("abc@abc.com");

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());

        UserDto request = UserDto.builder()
                .id(user.getId())
                .email("abcdefg@abc.com")
                .username("username1")
                .build();

        lenient().when(passwordEncoder.encode(anyString())).then(AdditionalAnswers.returnsFirstArg());
        lenient().when(userRepository.save(any())).then(AdditionalAnswers.returnsFirstArg());
        lenient().when(userRepository.existsByUsername(any())).thenReturn(true);
        lenient().when(userRepository.existsByEmail(any())).thenReturn(false);
        lenient().when(userRepository.findById(any())).thenReturn(Optional.of(user));

        assertThrows(InvisoException.class, () -> userService.update(request));
    }
}