package com.peerprep.peerprepmatchingservice;

import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import com.peerprep.peerprepcommon.dto.question.Category;
import com.peerprep.peerprepcommon.dto.question.Complexity;
import com.peerprep.peerprepmatchingservice.messaging.RedisMessageSubscriber;
import com.peerprep.peerprepmatchingservice.service.MatchingService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RedisMessageSubscriberTest {

    @Mock
    private RedisTemplate<String, MatchRequest> redisTemplate;

    @Mock
    private MatchingService matchingService;

    @Mock
    private ValueOperations<String, MatchRequest> valueOperations;

    @InjectMocks
    private RedisMessageSubscriber redisMessageSubscriber;

    @Test
    void testOnMessage() {
        String json = "{\"isCreate\":true,\"userId\":\"1\",\"complexity\":\"EASY\",\"category\":\"ARRAYS\"}";
        Message mockMessage = mock(Message.class);
        when(mockMessage.getBody()).thenReturn(json.getBytes());

        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        when(valueOperations.get(anyString())).thenReturn(new MatchRequest(true, "user1", Complexity.EASY, Category.ARRAYS));

        redisMessageSubscriber.onMessage(mockMessage, new byte[0]);

        verify(matchingService).processMatch(any(MatchRequest.class), any(MatchRequest.class));
    }

}
