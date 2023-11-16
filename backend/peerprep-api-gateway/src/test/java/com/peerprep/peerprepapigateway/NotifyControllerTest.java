package com.peerprep.peerprepapigateway;

import com.peerprep.peerprepapigateway.controller.NotifyController;
import com.peerprep.peerprepcommon.dto.match.MatchResponse;
import com.peerprep.peerprepcommon.dto.match.MatchResult;
import com.peerprep.peerprepcommon.dto.question.Category;
import com.peerprep.peerprepcommon.dto.question.Complexity;
import com.peerprep.peerprepcommon.dto.session.CreateSessionRequest;
import com.peerprep.peerprepcommon.dto.session.SessionDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class NotifyControllerTest {

    @Mock
    private SimpMessagingTemplate simpMessagingTemplate;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private NotifyController notifyController;

    @BeforeEach
    void setup() {
        ReflectionTestUtils.setField(notifyController, "questionServiceUrl", "mockUrl");
        ReflectionTestUtils.setField(notifyController, "sessionServiceUrl", "mockUrl");
    }

    @Test
    public void receiveMatchResult_ShouldNotifyUsers() {
        MatchResult matchResult = new MatchResult("user1", "user2", Complexity.EASY, Category.ARRAYS);
        String questionId = "randomQuestionId";
        SessionDTO sessionDTO = new SessionDTO("id", "user1", "user2", "sessionId", "roomId", false);

        when(restTemplate.postForObject(anyString(), any(), eq(String.class))).thenReturn(questionId);
        when(restTemplate.postForObject(anyString(), any(), eq(SessionDTO.class))).thenReturn(sessionDTO);

        ResponseEntity<?> response = notifyController.receiveMatchResult(matchResult);

        verify(restTemplate).postForObject(anyString(), any(), eq(String.class));
        verify(restTemplate).postForObject(anyString(), any(CreateSessionRequest.class), eq(SessionDTO.class));
        verify(simpMessagingTemplate).convertAndSendToUser(eq("user1"), eq("/queue/match"), any(MatchResponse.class));
        verify(simpMessagingTemplate).convertAndSendToUser(eq("user2"), eq("/queue/match"), any(MatchResponse.class));
        assertEquals(ResponseEntity.ok().build(), response);
    }
}
