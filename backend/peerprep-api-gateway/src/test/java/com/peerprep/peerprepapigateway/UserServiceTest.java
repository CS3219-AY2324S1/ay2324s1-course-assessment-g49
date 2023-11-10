package com.peerprep.peerprepapigateway;

import com.peerprep.peerprepapigateway.dto.request.CreateUserRequest;
import com.peerprep.peerprepapigateway.dto.request.UpdateUserRequest;
import com.peerprep.peerprepapigateway.dto.response.LoginResponse;
import com.peerprep.peerprepapigateway.dto.response.UserResponse;
import com.peerprep.peerprepapigateway.entity.User;
import com.peerprep.peerprepapigateway.exception.BadCredentialsException;
import com.peerprep.peerprepapigateway.exception.EmailExistsException;
import com.peerprep.peerprepapigateway.exception.UserNotFoundException;
import com.peerprep.peerprepapigateway.exception.UsernameExistsException;
import com.peerprep.peerprepapigateway.repository.UserRepository;
import com.peerprep.peerprepapigateway.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void testAuthenticateUserSuccess() throws BadCredentialsException {
        User mockUser = new User(1L, "username", "email", "country", "password");
        when(userRepository.findFirstByUsername("username")).thenReturn(Optional.of(mockUser));

        LoginResponse response = userService.authenticateUser("username", "password");

        assertNotNull(response);
        assertEquals("username", response.getUsername());
        assertEquals(1L, response.getId());
    }

    @Test
    void testAuthenticateUserFailure() {
        when(userRepository.findFirstByUsername("username")).thenReturn(Optional.empty());

        assertThrows(BadCredentialsException.class, () -> {
            userService.authenticateUser("username", "wrongpassword");
        });
    }

    @Test
    void testCreateUser() throws UsernameExistsException, EmailExistsException {
        CreateUserRequest request = new CreateUserRequest("newuser", "newemail", "password", "country");
        User newUser = new User(2L, "newuser", "newemail", "country", "password");

        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(userRepository.existsByEmail("newemail")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(newUser);

        Long userId = userService.createUser(request);

        assertEquals(2L, userId);
    }

    @Test
    void testCreateUserExistingUsername() {
        CreateUserRequest request = new CreateUserRequest("username", "email", "password", "country");
        when(userRepository.existsByUsername("username")).thenReturn(true);

        assertThrows(UsernameExistsException.class, () -> {
            userService.createUser(request);
        });
    }

    // Similarly write tests for deleteUser, getUsers, getUser, updateUser
    @Test
    void testDeleteUserSuccess() {
        when(userRepository.existsById("1")).thenReturn(true);
        userService.deleteUser("1");
        verify(userRepository).deleteById("1");
    }

    @Test
    void testDeleteUserNotFound() {
        when(userRepository.existsById("1")).thenReturn(false);
        assertThrows(UserNotFoundException.class, () -> userService.deleteUser("1"));
    }

    @Test
    void testGetUsers() {
        List<User> users = List.of(
                new User(1L, "user1", "user1@example.com", "Country1", "password1"),
                new User(2L, "user2", "user2@example.com", "Country2", "password2")
        );
        when(userRepository.findAll()).thenReturn(users);

        List<UserResponse> userResponses = userService.getUsers();

        assertEquals(2, userResponses.size());
        assertEquals("user1", userResponses.get(0).getUsername());
        assertEquals("user2", userResponses.get(1).getUsername());
    }

    @Test
    void testGetUserFound() {
        User user = new User(1L, "username", "email", "country", "password");
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
        User user = new User(1L, "oldusername", "oldemail", "oldcountry", "oldpassword");
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
        User user = new User(1L, "oldusername", "oldemail", "oldcountry", "oldpassword");
        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        when(userRepository.existsByUsername("newusername")).thenReturn(true);

        UpdateUserRequest request = new UpdateUserRequest("newusername", "newemail", "newpassword", "newcountry");
        assertThrows(UsernameExistsException.class, () -> userService.updateUser("1", request));
    }

    @Test
    void testUpdateUserEmailExists() {
        User user = new User(1L, "oldusername", "oldemail", "oldcountry", "oldpassword");
        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        when(userRepository.existsByUsername("newusername")).thenReturn(false);
        when(userRepository.existsByEmail("newemail")).thenReturn(true);


        UpdateUserRequest request = new UpdateUserRequest("newusername", "newemail", "newpassword", "newcountry");
        assertThrows(EmailExistsException.class, () -> userService.updateUser("1", request));
    }

}
