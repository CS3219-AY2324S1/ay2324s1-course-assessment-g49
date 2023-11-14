package com.peerprep.peerprepattemptservice.controller;

import com.peerprep.peerprepcommon.dto.attempt.AttemptDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:8080")
public class AttemptController {

    @PostMapping
    public ResponseEntity<Void> createAttempt(@RequestBody AttemptDTO request) {
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<AttemptDTO>> getAttempts() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttemptDTO> getAttempt(@PathVariable final int id) {
        return ResponseEntity.ok().build();
    }

}
