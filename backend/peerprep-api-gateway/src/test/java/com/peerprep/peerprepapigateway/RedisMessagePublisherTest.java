package com.peerprep.peerprepapigateway;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.peerprep.peerprepapigateway.service.RedisMessagePublisher;
import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RedisMessagePublisherTest {

    @Mock
    private RedisTemplate<String, String> redisTemplate;

    @Mock
    private ChannelTopic topic;

    @InjectMocks
    private RedisMessagePublisher redisMessagePublisher;

    @Test
    void publish_ShouldSendCorrectMessage() throws Exception {
        MatchRequest matchRequest = new MatchRequest();
        String expectedMessage = new ObjectMapper().writeValueAsString(matchRequest);
        when(topic.getTopic()).thenReturn("testTopic");

        redisMessagePublisher.publish(matchRequest);

        verify(redisTemplate).convertAndSend("testTopic", expectedMessage);
    }

}
