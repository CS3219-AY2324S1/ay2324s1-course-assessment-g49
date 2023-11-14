package com.peerprep.peerprepapigateway;

import com.peerprep.peerprepapigateway.gateway.MatchingGateway;
import com.peerprep.peerprepapigateway.service.RedisMessagePublisher;
import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class MatchingGatewayTest {

    @Mock
    private RedisMessagePublisher redisMessagePublisher;

    @InjectMocks
    private MatchingGateway matchingGateway;

    @Test
    public void submitMatch_ShouldPublishMatchRequest() {
        MatchRequest mockRequest = new MatchRequest();

        matchingGateway.submitMatch(mockRequest);

        verify(redisMessagePublisher).publish(mockRequest);
    }
}
