package com.peerprep.peerprepsessionservice.controller;

import com.peerprep.peerprepsessionservice.exception.SessionNotFoundException;
import com.peerprep.peerprepsessionservice.service.AttemptService;
import com.peerprep.peerprepcommon.dto.session.AttemptDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attempt")
@CrossOrigin("http://localhost:8080")
public class AttemptController {

    private final AttemptService attemptService;

    @PostMapping
    public ResponseEntity<String> createAttempt(@RequestBody AttemptDTO request) throws SessionNotFoundException {
        attemptService.createAttempt(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<AttemptDTO>> getAttempts(@PathVariable String userId) {
        List<AttemptDTO> attempts = attemptService.getAllAttempts(userId);
        return ResponseEntity.ok(attempts);
    }

    @ExceptionHandler(SessionNotFoundException.class)
    public ResponseEntity<String> handleSessionNotFound(SessionNotFoundException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("session id not found");
    }
}
