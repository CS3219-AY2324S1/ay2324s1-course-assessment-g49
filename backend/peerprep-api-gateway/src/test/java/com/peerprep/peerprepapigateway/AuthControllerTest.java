package com.peerprep.peerprepbackend;

import com.peerprep.peerprepapigateway.controller.AuthController;
import com.peerprep.peerprepapigateway.dto.request.LoginRequest;
import com.peerprep.peerprepapigateway.dto.request.RegisterRequest;
import com.peerprep.peerprepapigateway.dto.response.LoginResponse;
import com.peerprep.peerprepapigateway.exception.EmailExistsException;
import com.peerprep.peerprepapigateway.exception.UsernameExistsException;
import com.peerprep.peerprepapigateway.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthController authController;

    @Test
    public void testLogin_Success() throws BadCredentialsException {
        LoginRequest request = new LoginRequest("username", "password");
        LoginResponse expectedResponse = new LoginResponse("token");
        when(userService.authenticateUser(anyString(), anyString())).thenReturn(expectedResponse);

        ResponseEntity<LoginResponse> response = authController.login(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
    }

    @Test
    public void testRegister_Success() throws Exception {
        RegisterRequest request = new RegisterRequest("username", "email@example.com", "country", "password");
        when(userService.createUser(any(RegisterRequest.class))).thenReturn(1L);

        ResponseEntity<String> response = authController.register(request);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("1", response.getBody());
    }

    @Test
    public void testLogin_BadCredentials() {
        LoginRequest request = new LoginRequest("username", "wrong-password");
        when(userService.authenticateUser(anyString(), anyString())).thenThrow(new BadCredentialsException("Bad credentials"));

        Exception exception = assertThrows(BadCredentialsException.class, () -> {
            authController.login(request);
        });

        String expectedMessage = "Bad credentials";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }

    @Test
    public void testRegister_UsernameExists() throws UsernameExistsException, EmailExistsException {
        RegisterRequest request = new RegisterRequest("username", "email@example.com", "country", "password");
        when(userService.createUser(any(RegisterRequest.class))).thenThrow(new UsernameExistsException("wrong-username"));

        UsernameExistsException exception = assertThrows(UsernameExistsException.class, () -> {
            authController.register(request);
        });

        String expectedMessage = "wrong-username";
        String actualMessage = exception.getUsername();

        assertTrue(actualMessage.contains(expectedMessage));
    }


    @Test
    public void testRegister_EmailExists() throws UsernameExistsException, EmailExistsException {
        RegisterRequest request = new RegisterRequest("username", "email@example.com", "country", "password");
        when(userService.createUser(any(RegisterRequest.class))).thenThrow(new EmailExistsException("wrong-email"));

        EmailExistsException exception = assertThrows(EmailExistsException.class, () -> {
            authController.register(request);
        });

        String expectedMessage = "wrong-email";
        String actualMessage = exception.getEmail();

        assertTrue(actualMessage.contains(expectedMessage));
    }

}
