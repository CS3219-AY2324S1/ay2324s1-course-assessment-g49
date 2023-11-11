package com.peerprep.peerprepapigateway;

import com.peerprep.peerprepapigateway.dto.request.RegisterRequest;
import com.peerprep.peerprepapigateway.dto.request.UpdateUserRequest;
import com.peerprep.peerprepapigateway.dto.response.LoginResponse;
import com.peerprep.peerprepapigateway.dto.response.UserResponse;
import com.peerprep.peerprepapigateway.entity.Role;
import com.peerprep.peerprepapigateway.entity.User;
import com.peerprep.peerprepapigateway.exception.EmailExistsException;
import com.peerprep.peerprepapigateway.exception.UserNotFoundException;
import com.peerprep.peerprepapigateway.exception.UsernameExistsException;
import com.peerprep.peerprepapigateway.repository.UserRepository;
import com.peerprep.peerprepapigateway.service.UserService;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

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
    void testAuthenticateUserSuccess() throws BadCredentialsException {
        User mockUser = new User(1L, "username", "email", "country", "password", Role.USER);
        when(userRepository.findFirstByUsername("username")).thenReturn(Optional.of(mockUser));
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);

        LoginResponse response = userService.authenticateUser("username", "password");

        assertNotNull(response);
        assertFalse(response.getJwt().isEmpty());
    }

    @Test
    void testAuthenticateUserFailure() {
        when(userRepository.findFirstByUsername("username")).thenReturn(Optional.empty());

        assertThrows(BadCredentialsException.class, () -> {
            userService.authenticateUser("username", "wrongpassword");
        });
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
    void testGetUsers() {
        List<User> users = List.of(
                new User(1L, "user1", "user1@example.com", "Country1", "password1", Role.USER),
                new User(2L, "user2", "user2@example.com", "Country2", "password2", Role.USER)
        );
        when(userRepository.findAll()).thenReturn(users);

        List<UserResponse> userResponses = userService.getUsers();

        assertEquals(2, userResponses.size());
        assertEquals("user1", userResponses.get(0).getUsername());
        assertEquals("user2", userResponses.get(1).getUsername());
    }

    @Test
    void testGetUserFound() {
        User user = new User(1L, "username", "email", "country", "password", Role.USER);
        when(userRepository.findById("1")).thenReturn(Optional.of(user));

        UserResponse response = userService.getUser("1");

        assertNotNull(response);
        assertEquals("username", response.getUsername());
    }

    @Test
    void testGetUserNotFound() {
        when(userRepository.findById("1")).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.getUser("1"));
    }

    @Test
    void testUpdateUserSuccess() throws UsernameExistsException, EmailExistsException {
        User user = new User(1L, "oldusername", "oldemail", "oldcountry", "oldpassword", Role.USER);
        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        when(userRepository.existsByUsername("newusername")).thenReturn(false);
        when(userRepository.existsByEmail("newemail")).thenReturn(false);

        UpdateUserRequest request = new UpdateUserRequest("newusername", "newemail", "newpassword", "newcountry");
        userService.updateUser("1", request);

        verify(userRepository).save(user);
    }


    @Test
    void testUpdateUserNotFound() {
        when(userRepository.findById("1")).thenReturn(Optional.empty());
        UpdateUserRequest request = new UpdateUserRequest(); // Assume request is properly built
        assertThrows(UserNotFoundException.class, () -> userService.updateUser("1", request));
    }

    @Test
    void testUpdateUserUsernameExists() {
        User user = new User(1L, "oldusername", "oldemail", "oldcountry", "oldpassword", Role.USER);
        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        when(userRepository.existsByUsername("newusername")).thenReturn(true);

        UpdateUserRequest request = new UpdateUserRequest("newusername", "newemail", "newpassword", "newcountry");
        assertThrows(UsernameExistsException.class, () -> userService.updateUser("1", request));
    }

    @Test
    void testUpdateUserEmailExists() {
        User user = new User(1L, "oldusername", "oldemail", "oldcountry", "oldpassword", Role.USER);
        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        when(userRepository.existsByUsername("newusername")).thenReturn(false);
        when(userRepository.existsByEmail("newemail")).thenReturn(true);


        UpdateUserRequest request = new UpdateUserRequest("newusername", "newemail", "newpassword", "newcountry");
        assertThrows(EmailExistsException.class, () -> userService.updateUser("1", request));
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
