package com.peerprep.peerprepmatchingservice;

import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import com.peerprep.peerprepcommon.dto.match.MatchResult;
import com.peerprep.peerprepcommon.dto.question.Category;
import com.peerprep.peerprepcommon.dto.question.Complexity;
import com.peerprep.peerprepmatchingservice.service.MatchingService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class MatchingServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private MatchingService matchingService;

    @Test
    void testProcessMatch() {
        String apiGatewayUrl = "http://localhost:8082"; // Example URL
        String expectedUrl = apiGatewayUrl + "/notify/result";
        MatchRequest request1 = new MatchRequest("user1", Complexity.EASY, Category.ARRAYS);
        MatchRequest request2 = new MatchRequest("user2", Complexity.EASY, Category.ARRAYS);

        ReflectionTestUtils.setField(matchingService, "apiGatewayUrl", apiGatewayUrl);

        matchingService.processMatch(request1, request2);

        verify(restTemplate).postForEntity(expectedUrl, new MatchResult(request1.getUserId(), request2.getUserId(), request1.getComplexity(), request1.getCategory()), Void.class);
    }
}
