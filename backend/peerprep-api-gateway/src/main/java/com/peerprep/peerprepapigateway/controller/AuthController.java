package com.peerprep.peerprepapigateway.controller;

import com.peerprep.peerprepapigateway.dto.request.LoginRequest;
import com.peerprep.peerprepapigateway.dto.response.LoginResponse;
import com.peerprep.peerprepapigateway.exception.BadCredentialsException;
import com.peerprep.peerprepapigateway.service.UserService;
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
