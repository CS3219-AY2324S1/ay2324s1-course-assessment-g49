package com.peerprep.peerprepapigateway;

import com.peerprep.peerprepapigateway.controller.RestExceptionHandler;
import com.peerprep.peerprepapigateway.exception.EmailExistsException;
import com.peerprep.peerprepapigateway.exception.UserNotFoundException;
import com.peerprep.peerprepapigateway.exception.UsernameExistsException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class RestExceptionHandlerTest {

    private RestExceptionHandler restExceptionHandler;

    @BeforeEach
    public void setUp() {
        restExceptionHandler = new RestExceptionHandler();
    }

    @Test
    void handleRuntimeException_ShouldReturnInternalServerError() {
        RuntimeException exception = new RuntimeException("Test exception");

        ResponseEntity<String> response = restExceptionHandler.handleRuntimeException(exception);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Error processing request", response.getBody());
    }

    @Test
    void handleBadCredentialsException_ShouldReturnUnauthorized() {
        ResponseEntity<String> response = restExceptionHandler.handleBadCredentialsException();

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Your username or password was incorrect.", response.getBody());
    }

    @Test
    void handleUsernameExistsException_ShouldReturnBadRequest() {
        UsernameExistsException exception = new UsernameExistsException("testUsername");

        ResponseEntity<String> response = restExceptionHandler.handleUsernameExistsException(exception);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Username testUsername already exists.", response.getBody());
    }

    @Test
    void handleEmailExistsException_ShouldReturnBadRequest() {
        EmailExistsException exception = new EmailExistsException("test@example.com");

        ResponseEntity<String> response = restExceptionHandler.handleEmailExistsException(exception);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Email test@example.com already exists.", response.getBody());
    }

    @Test
    void handleUserNotFoundException_ShouldReturnNotFound() {
        UserNotFoundException exception = new UserNotFoundException("123");

        ResponseEntity<String> response = restExceptionHandler.handleUserNotFoundException(exception);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User 123 not found", response.getBody());
    }

    @Test
    void handleHttpMessageNotReadableException_ShouldReturnBadRequest() {
        HttpMessageNotReadableException exception = new HttpMessageNotReadableException("Error message");

        ResponseEntity<String> response = restExceptionHandler.handleHttpMessageNotReadableException(exception);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Error message", response.getBody());
    }

    @Test
    void handleValidationExceptions_ShouldReturnBadRequest() {
        MethodArgumentNotValidException exception = createMethodArgumentNotValidException();

        ResponseEntity<Map<String, String>> response = restExceptionHandler.handleValidationExceptions(exception);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertTrue(response.getBody().containsKey("fieldName"));
        assertEquals("error message", response.getBody().get("fieldName"));
    }

    private MethodArgumentNotValidException createMethodArgumentNotValidException() {
        FieldError fieldError = new FieldError("objectName", "fieldName", "error message");
        BindingResult bindingResult = new BindException(new Object(), "objectName");
        bindingResult.addError(fieldError);
        return new MethodArgumentNotValidException((MethodParameter) null, bindingResult);
    }


}
