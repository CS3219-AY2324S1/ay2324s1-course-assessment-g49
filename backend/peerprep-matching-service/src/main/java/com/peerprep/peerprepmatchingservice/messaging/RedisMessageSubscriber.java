package com.peerprep.peerprepmatchingservice.messaging;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import com.peerprep.peerprepmatchingservice.service.MatchingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;

@Component
@RequiredArgsConstructor
@Slf4j
public class RedisMessageSubscriber implements MessageListener {

    private final RedisTemplate<String, MatchRequest> redisTemplate;

    private final MatchingService matchingService;

    public void onMessage(Message message, byte[] pattern) {
        log.info("RedisMessageSubscriber: Received message");
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
        log.info("RedisMessageSubscriber: Received create request from " + matchRequest.getUserId());
        String key = matchRequest.getComplexity().toString() + matchRequest.getCategory();
        log.info("RedisMessageSubscriber: key is " + key);
        try {
            MatchRequest existingMatchRequest = redisTemplate.opsForValue().get(key);
            if (existingMatchRequest != null) {
                if (existingMatchRequest.getUserId().equals(matchRequest.getUserId())) {
                    return;
                }
                log.info("RedisMessageSubscriber: Match found");
                matchingService.processMatch(matchRequest, existingMatchRequest);
                redisTemplate.delete(key);
            } else {
                log.info("RedisMessageSubscriber: existing match is null, no match");
                Duration timeout = Duration.ofSeconds(20);
                redisTemplate.opsForValue().set(key, matchRequest, timeout);
            }
        } catch (Exception e) {
            log.error("Error processing Redis operation: ", e);
        }
    }

    private void handleCancel(MatchRequest matchRequest) {
        String key = matchRequest.getComplexity().toString() + matchRequest.getCategory();
        log.info("RedisMessageSubscriber: Received cancel request from " + matchRequest.getUserId());
        if (Boolean.TRUE.equals(redisTemplate.hasKey(key))) {
            redisTemplate.opsForValue().getAndDelete(key);
        }
    }
}