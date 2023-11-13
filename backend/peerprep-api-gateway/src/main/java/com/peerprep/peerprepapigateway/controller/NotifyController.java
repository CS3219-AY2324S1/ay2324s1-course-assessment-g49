package com.peerprep.peerprepapigateway.controller;

import com.peerprep.peerprepcommon.dto.match.MatchResponse;
import com.peerprep.peerprepcommon.dto.match.MatchResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notify")
public class NotifyController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping("/result")
    public ResponseEntity<?> receiveMatchResult(@RequestBody MatchResult matchResult) {
        // generate meeting token
        String meetingId = "placeholder meeting id";

        // notify respective frontend
        this.simpMessagingTemplate.convertAndSendToUser(matchResult.getUserId1(), "/queue/match", new MatchResponse(matchResult.getUserId2(), meetingId, matchResult.getComplexity(), matchResult.getCategory()));
        this.simpMessagingTemplate.convertAndSendToUser(matchResult.getUserId2(), "/queue/match", new MatchResponse(matchResult.getUserId1(), meetingId, matchResult.getComplexity(), matchResult.getCategory()));
        return ResponseEntity.ok().build();
    }
}
