package com.peerprep.peerprepbackend.controller;

import com.peerprep.peerprepbackend.dto.request.RegisterRequest;
import com.peerprep.peerprepbackend.dto.request.LoginRequest;
import com.peerprep.peerprepbackend.dto.response.LoginResponse;
import com.peerprep.peerprepbackend.exception.EmailExistsException;
import com.peerprep.peerprepbackend.exception.UsernameExistsException;
import com.peerprep.peerprepbackend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
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
