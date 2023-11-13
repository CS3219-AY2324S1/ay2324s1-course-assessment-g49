package com.peerprep.peerprepapigateway.controller;

import com.peerprep.peerprepapigateway.service.RedisMessagePublisher;
import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import com.peerprep.peerprepcommon.dto.match.MatchResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class MatchingController {

    private final RedisMessagePublisher redisMessagePublisher;

    @MessageMapping("/match")
    public void submitMatch(@RequestBody MatchRequest request) {
        redisMessagePublisher.publish(request);
    }
}
