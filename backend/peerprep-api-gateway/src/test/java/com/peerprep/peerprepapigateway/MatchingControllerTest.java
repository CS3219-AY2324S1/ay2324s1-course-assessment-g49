package com.peerprep.peerprepapigateway;

import com.peerprep.peerprepapigateway.controller.MatchingController;
import com.peerprep.peerprepapigateway.service.RedisMessagePublisher;
import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class MatchingControllerTest {

    @Mock
    private RedisMessagePublisher redisMessagePublisher;

    @InjectMocks
    private MatchingController matchingController;

    @Test
    public void submitMatch_ShouldPublishMatchRequest() {
        MatchRequest mockRequest = new MatchRequest();

        matchingController.submitMatch(mockRequest);

        verify(redisMessagePublisher).publish(mockRequest);
    }
}
