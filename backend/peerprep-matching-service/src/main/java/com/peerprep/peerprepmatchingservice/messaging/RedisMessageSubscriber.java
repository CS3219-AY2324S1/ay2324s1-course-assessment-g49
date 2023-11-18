package com.peerprep.peerprepmatchingservice.messaging;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import com.peerprep.peerprepmatchingservice.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;

@Component
@RequiredArgsConstructor
public class RedisMessageSubscriber implements MessageListener {

    private final RedisTemplate<String, MatchRequest> redisTemplate;

    private final MatchingService matchingService;

    public void onMessage(Message message, byte[] pattern) {
        MatchRequest matchRequest;
        try {
            String json = new String(message.getBody());
            matchRequest = (new ObjectMapper()).readValue(json, MatchRequest.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        if (matchRequest.getIsCreate()) {
            handleCreate(matchRequest);
        } else {
            handleCancel(matchRequest);
        }
    }

    private void handleCreate(MatchRequest matchRequest) {
        String key = matchRequest.getComplexity().toString() + matchRequest.getCategory().toString();
        try {
            MatchRequest existingMatchRequest = redisTemplate.opsForValue().get(key);
            if (existingMatchRequest != null) {
                if (existingMatchRequest.getUserId().equals(matchRequest.getUserId())) {
                    return;
                }
                matchingService.processMatch(matchRequest, existingMatchRequest);
                redisTemplate.delete(key);
            } else {
                Duration timeout = Duration.ofSeconds(20);
                redisTemplate.opsForValue().set(key, matchRequest, timeout);
            }
        } catch (Exception e) {
        }
    }

    private void handleCancel(MatchRequest matchRequest) {
        String key = matchRequest.getComplexity().toString() + matchRequest.getCategory().toString();
        if (Boolean.TRUE.equals(redisTemplate.hasKey(key))) {
            redisTemplate.opsForValue().getAndDelete(key);
        }
    }
}