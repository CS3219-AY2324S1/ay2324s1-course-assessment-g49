package com.peerprep.peerprepapigateway.controller;

import com.peerprep.peerprepcommon.dto.match.MatchResponse;
import com.peerprep.peerprepcommon.dto.match.MatchResult;
import com.peerprep.peerprepcommon.dto.question.RandomQuestionRequest;
import com.peerprep.peerprepcommon.dto.session.CreateSessionRequest;
import com.peerprep.peerprepcommon.dto.session.SessionDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notify")
@CrossOrigin(origins = "http://localhost:8083")
@Slf4j
public class NotifyController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final RestTemplate restTemplate;

    @Value("${peerprep.question-service.url}")
    private String questionServiceUrl;

    @Value("${peerprep.session-service.url}")
    private String sessionServiceUrl;

    @PostMapping("/result")
    public ResponseEntity<?> receiveMatchResult(@RequestBody MatchResult matchResult) {
        log.info("NotifyController: Received match result from MatchingService");
        // get random question id from peerprep-question-service
        RandomQuestionRequest randomQuestionRequest = new RandomQuestionRequest(matchResult.getComplexity(), matchResult.getCategory());
        String questionId = restTemplate.postForObject(questionServiceUrl + "/random", randomQuestionRequest, String.class);
        log.info("NotifyController: Got random question id :" + questionId);

        // create session in peerprep-session-service
        CreateSessionRequest createSessionRequest = new CreateSessionRequest(matchResult.getUserId1(), matchResult.getUserId2(), questionId);
        SessionDTO session = restTemplate.postForObject(sessionServiceUrl + "/session", createSessionRequest, SessionDTO.class);
        log.info("NotifyController: Got session object :" + session.toString());

        // notify respective frontend
        try {
            this.simpMessagingTemplate.convertAndSendToUser(matchResult.getUserId1(), "/queue/match", new MatchResponse(matchResult.getUserId2(), session.getId(), questionId, session.getRoomId()));
        } catch (MessagingException e) {
            log.error(e.getMessage());
        }
        try {
            this.simpMessagingTemplate.convertAndSendToUser(matchResult.getUserId2(), "/queue/match", new MatchResponse(matchResult.getUserId1(), session.getId(), questionId, session.getRoomId()));
        } catch (MessagingException e) {
            log.error(e.getMessage());
        }
        log.info("NotifyController: Sent match response back to user via websocket");
        return ResponseEntity.ok().build();
    }
}
