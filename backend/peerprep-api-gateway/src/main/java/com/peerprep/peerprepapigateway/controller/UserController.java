package com.peerprep.peerprepapigateway.controller;

import com.peerprep.peerprepapigateway.dto.request.CreateUserRequest;
import com.peerprep.peerprepapigateway.dto.request.UpdateUserRequest;
import com.peerprep.peerprepapigateway.dto.response.UserResponse;
import com.peerprep.peerprepapigateway.exception.EmailExistsException;
import com.peerprep.peerprepapigateway.exception.UsernameExistsException;
import com.peerprep.peerprepapigateway.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getUsers() {
        List<UserResponse> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable final String id) {
        UserResponse user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<String> createUser(@Valid @RequestBody final CreateUserRequest request) throws UsernameExistsException, EmailExistsException {
        Long id = userService.createUser(request);
        return ResponseEntity.status(201).body(Long.toString(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable final String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("{id}")
    public ResponseEntity<String> updateUser(@PathVariable final String id, @Valid @RequestBody final UpdateUserRequest request) throws UsernameExistsException, EmailExistsException {
        userService.updateUser(id, request);
        return ResponseEntity.ok(id);
    }
}
