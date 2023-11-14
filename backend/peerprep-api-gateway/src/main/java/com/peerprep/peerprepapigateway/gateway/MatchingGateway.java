package com.peerprep.peerprepapigateway.gateway;

import com.peerprep.peerprepapigateway.service.RedisMessagePublisher;
import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class MatchingGateway {

    private final RedisMessagePublisher redisMessagePublisher;

    @MessageMapping("/match")
    public void submitMatch(@RequestBody MatchRequest request) {
        redisMessagePublisher.publish(request);
    }

    @MessageMapping("/cancel")
    public void cancelMatch(@RequestBody MatchRequest request) {
        redisMessagePublisher.publish(request);
    }
}
