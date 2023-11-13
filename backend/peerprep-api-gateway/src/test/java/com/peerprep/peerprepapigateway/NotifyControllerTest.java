package com.peerprep.peerprepapigateway;

import com.peerprep.peerprepapigateway.controller.NotifyController;
import com.peerprep.peerprepcommon.dto.match.MatchResponse;
import com.peerprep.peerprepcommon.dto.match.MatchResult;
import com.peerprep.peerprepcommon.dto.question.Category;
import com.peerprep.peerprepcommon.dto.question.Complexity;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import static org.mockito.Mockito.verify;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class NotifyControllerTest {

    @Mock
    private SimpMessagingTemplate simpMessagingTemplate;

    @InjectMocks
    private NotifyController notifyController;

    @Test
    public void receiveMatchResult_ShouldNotifyUsers() {
        // Arrange
        MatchResult matchResult = new MatchResult("user1", "user2", Complexity.EASY, Category.ARRAYS);

        // Act
        ResponseEntity<?> response = notifyController.receiveMatchResult(matchResult);

        // Assert
        verify(simpMessagingTemplate).convertAndSendToUser("user1", "/queue/match", new MatchResponse("user2", "placeholder meeting id", Complexity.EASY, Category.ARRAYS));
        verify(simpMessagingTemplate).convertAndSendToUser("user2", "/queue/match", new MatchResponse("user1", "placeholder meeting id", Complexity.EASY, Category.ARRAYS));
        assertEquals(ResponseEntity.ok().build(), response);
    }
}
