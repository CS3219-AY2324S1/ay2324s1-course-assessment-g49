package com.peerprep.peerprepsessionservice.controller;

import com.peerprep.peerprepcommon.dto.session.CreateSessionRequest;
import com.peerprep.peerprepcommon.dto.session.SessionDTO;
import com.peerprep.peerprepsessionservice.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/session")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8080")
public class SessionController {

    private final SessionService sessionService;

    @PostMapping
    public ResponseEntity<SessionDTO> createSession(@RequestBody CreateSessionRequest request) {
        SessionDTO session = sessionService.createSession(request);
        return ResponseEntity.ok(session);
    }
}
