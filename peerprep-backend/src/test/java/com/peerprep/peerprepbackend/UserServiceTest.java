package com.peerprep.peerprepbackend;

import com.peerprep.peerprepbackend.dto.request.RegisterRequest;
import com.peerprep.peerprepbackend.dto.response.LoginResponse;
import com.peerprep.peerprepbackend.entity.Role;
import com.peerprep.peerprepbackend.entity.User;
import com.peerprep.peerprepbackend.exception.EmailExistsException;
import com.peerprep.peerprepbackend.exception.UserNotFoundException;
import com.peerprep.peerprepbackend.exception.UsernameExistsException;
import com.peerprep.peerprepbackend.repository.UserRepository;
import com.peerprep.peerprepbackend.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        // set values for the fields injected from properties file
        ReflectionTestUtils.setField(userService, "jwtSecret", "secret");
        ReflectionTestUtils.setField(userService, "jwtExpiration", 3600L);
        ReflectionTestUtils.setField(userService, "appName", "peerprep-api-gateway");
    }


    @Test
    void authenticateUser_Success() {
        // Arrange
        String username = "testUser";
        String password = "testPass";
        User mockUser = User.builder()
                .id(1L)
                .username(username)
                .password(password)
                .role(Role.USER)
                .build();
        when(userRepository.findFirstByUsername(username)).thenReturn(Optional.of(mockUser));
        when(authenticationManager.authenticate(any())).thenReturn(null);

        LoginResponse response = userService.authenticateUser(username, password);

        assertNotNull(response);
    }

    @Test
    void createUser_Success() throws UsernameExistsException, EmailExistsException {
        RegisterRequest request = new RegisterRequest("newUser", "newEmail@example.com", "country", "password");
        when(userRepository.existsByUsername(request.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");

        User mockUser = User.builder()
                .id(1L)
                .username(request.getUsername())
                .email(request.getEmail())
                .country(request.getCountry())
                .password("encodedPassword")
                .role(Role.USER)
                .build();
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        Long userId = userService.createUser(request);

        assertNotNull(userId);
        assertEquals(1L, userId);
    }

    @Test
    void createUser_UsernameExists() {
        RegisterRequest request = new RegisterRequest("existingUser", "newEmail@example.com", "country", "password");
        when(userRepository.existsByUsername(request.getUsername())).thenReturn(true);

        assertThrows(UsernameExistsException.class, () -> {
            userService.createUser(request);
        });
    }

    @Test
    void deleteUser_Success() {
        String userId = "1";
        when(userRepository.existsById(userId)).thenReturn(true);

        userService.deleteUser(userId);

        verify(userRepository, times(1)).deleteById(userId);
    }

    @Test
    void deleteUser_UserNotFound() {
        String userId = "1";
        when(userRepository.existsById(userId)).thenReturn(false);

        assertThrows(UserNotFoundException.class, () -> {
            userService.deleteUser(userId);
        });
    }


}
