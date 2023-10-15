package com.peerprep.peerprepbackend.controller;

import com.peerprep.peerprepbackend.dto.request.LoginRequest;
import com.peerprep.peerprepbackend.dto.response.LoginResponse;
import com.peerprep.peerprepbackend.exception.BadCredentialsException;
import com.peerprep.peerprepbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
}
