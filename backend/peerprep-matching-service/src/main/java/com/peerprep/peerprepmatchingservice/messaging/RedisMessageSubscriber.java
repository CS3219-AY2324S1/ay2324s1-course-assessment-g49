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
        String key = matchRequest.getComplexity().toString() + matchRequest.getComplexity();
        if (Boolean.TRUE.equals(redisTemplate.hasKey(key))) {
            if (redisTemplate.opsForValue().get(key).getUserId().equals(matchRequest.getUserId())) {
                return;
            }
            MatchRequest existing = redisTemplate.opsForValue().getAndDelete(key);
            matchingService.processMatch(matchRequest, existing);
        } else {
            Duration timeout = Duration.ofSeconds(20);
            redisTemplate.opsForValue().set(key, matchRequest, timeout);
        }
    }

    private void handleCancel(MatchRequest matchRequest) {
        String key = matchRequest.getComplexity().toString() + matchRequest.getComplexity();
        if (Boolean.TRUE.equals(redisTemplate.hasKey(key))) {
            redisTemplate.opsForValue().getAndDelete(key);
        }
    }
}