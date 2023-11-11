package com.peerprep.peerprepapigateway.controller;

import com.peerprep.peerprepapigateway.dto.request.RegisterRequest;
import com.peerprep.peerprepapigateway.exception.EmailExistsException;
import com.peerprep.peerprepapigateway.exception.UsernameExistsException;
import jakarta.validation.Valid;
import com.peerprep.peerprepapigateway.dto.request.LoginRequest;
import com.peerprep.peerprepapigateway.dto.response.LoginResponse;
import com.peerprep.peerprepapigateway.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody final LoginRequest request) throws BadCredentialsException {
        LoginResponse authenticate = userService.authenticateUser(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(authenticate);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody final RegisterRequest request) throws UsernameExistsException, EmailExistsException {
        Long id = userService.createUser(request);
        return ResponseEntity.status(201).body(Long.toString(id));
    }
}
