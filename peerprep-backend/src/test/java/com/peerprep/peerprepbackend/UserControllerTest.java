package com.peerprep.peerprepbackend;

import com.peerprep.peerprepbackend.controller.UserController;
import com.peerprep.peerprepbackend.dto.request.UpdateUserRequest;
import com.peerprep.peerprepbackend.dto.response.UserResponse;
import com.peerprep.peerprepbackend.exception.EmailExistsException;
import com.peerprep.peerprepbackend.exception.UsernameExistsException;
import com.peerprep.peerprepbackend.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Test
    void testGetUsers() {
        UserResponse user1 = new UserResponse(1L, "user1", "user1@example.com", "country1");
        UserResponse user2 = new UserResponse(2L, "user2", "user2@example.com", "country2");
        List<UserResponse> users = Arrays.asList(user1, user2);
        when(userService.getUsers()).thenReturn(users);

        ResponseEntity<List<UserResponse>> response = userController.getUsers();

        assertEquals(2, response.getBody().size());
        assertEquals(user1, response.getBody().get(0));
        assertEquals(user2, response.getBody().get(1));
    }

    @Test
    void testGetUser() {
        String userId = "1";
        UserResponse user = new UserResponse(1L, "user1", "user1@example.com", "country1");
        when(userService.getUser(userId)).thenReturn(user);

        ResponseEntity<UserResponse> response = userController.getUser(userId);

        assertEquals(user, response.getBody());
    }

    @Test
    void testDeleteUser() {
        String userId = "1";

        ResponseEntity<Void> response = userController.deleteUser(userId);

        verify(userService, times(1)).deleteUser(userId);
        assertEquals(ResponseEntity.ok().build(), response);
    }

    @Test
    void testUpdateUser() throws UsernameExistsException, EmailExistsException {
        String userId = "1";
        UpdateUserRequest request = new UpdateUserRequest("newuser", "newemail@example.com", "newcountry", "newpassword");

        ResponseEntity<String> response = userController.updateUser(userId, request);

        verify(userService, times(1)).updateUser(eq(userId), any(UpdateUserRequest.class));
        assertEquals(userId, response.getBody());
    }

    @Test
    void testUpdateUser_UsernameExistsException() throws EmailExistsException, UsernameExistsException {
        String userId = "1";
        UpdateUserRequest request = new UpdateUserRequest("newuser", "newemail@example.com", "newcountry", "newpassword");
        doThrow(new UsernameExistsException("wrong-username")).when(userService).updateUser(eq(userId), any(UpdateUserRequest.class));

        UsernameExistsException thrown = assertThrows(
                UsernameExistsException.class,
                () -> userController.updateUser(userId, request)
        );

        assertEquals("wrong-username", thrown.getUsername());
    }


    @Test
    void testUpdateUser_EmailExistsException() throws UsernameExistsException, EmailExistsException {
        String userId = "1";
        UpdateUserRequest request = new UpdateUserRequest("newuser", "newemail@example.com", "newcountry", "newpassword");
        doThrow(new EmailExistsException("wrong-email")).when(userService).updateUser(eq(userId), any(UpdateUserRequest.class));

        EmailExistsException thrown = assertThrows(
                EmailExistsException.class,
                () -> userController.updateUser(userId, request)
        );

        assertEquals("wrong-email", thrown.getEmail());
    }



}
