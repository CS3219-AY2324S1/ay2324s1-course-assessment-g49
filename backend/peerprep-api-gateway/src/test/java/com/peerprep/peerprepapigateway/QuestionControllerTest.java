package com.peerprep.peerprepapigateway;

import com.peerprep.peerprepapigateway.controller.QuestionController;
import com.peerprep.peerprepcommon.dto.question.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class QuestionControllerTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private QuestionController questionController;

    @BeforeEach
    void setup() {
        ReflectionTestUtils.setField(questionController, "questionServiceUrl", "mockUrl");
    }

    @Test
    void testCreateQuestion() {
        CreateQuestionRequest mockRequest = new CreateQuestionRequest("Sample Title", "Sample Description", Set.of(Category.STRINGS), Complexity.EASY);
        ResponseEntity<String> mockResponse = new ResponseEntity<>("Question Created", HttpStatus.OK);

        when(restTemplate.postForEntity(anyString(), any(), eq(String.class))).thenReturn(mockResponse);
        ResponseEntity<String> response = questionController.createQuestion(mockRequest);

        assertNotNull(response, "response should not be null");
        assertEquals("Question Created", response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testGetQuestions() {
        List<QuestionOverview> mockResponseList = List.of(
                new QuestionOverview("1", "Sample Title", Set.of(Category.ARRAYS), Complexity.EASY)
        );
        ResponseEntity<List<QuestionOverview>> mockResponse = new ResponseEntity<>(mockResponseList, HttpStatus.OK);
        when(restTemplate.exchange(
                anyString(),
                any(HttpMethod.class),
                any(),
                any(ParameterizedTypeReference.class)
        )).thenReturn(mockResponse);

        ResponseEntity<List<QuestionOverview>> response = questionController.getQuestions();
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void testGetQuestion() {
        String questionId = "123";
        QuestionResponse mockQuestionResponse = new QuestionResponse("123", "Sample Title", "Sample Description", Set.of(Category.BRAINTEASER), Complexity.HARD);
        ResponseEntity<QuestionResponse> mockResponse = new ResponseEntity<>(mockQuestionResponse, HttpStatus.OK);
        when(restTemplate.getForEntity(anyString(), eq(QuestionResponse.class))).thenReturn(mockResponse);

        ResponseEntity<QuestionResponse> response = questionController.getQuestion(questionId);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("123", response.getBody().getId());
    }

    @Test
    void testDeleteQuestion() {
        String questionId = "123";

        ResponseEntity<Void> response = questionController.deleteQuestion(questionId);

        verify(restTemplate, times(1)).delete(anyString());
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void testUpdateQuestion() {
        String questionId = "123";
        UpdateQuestionRequest updateRequest = new UpdateQuestionRequest("Updated Title", "Updated Description", Set.of(Category.DATABASES), Complexity.MEDIUM);

        ResponseEntity<Void> response = questionController.updateQuestion(questionId, updateRequest);

        verify(restTemplate, times(1)).exchange(
                anyString(),
                eq(HttpMethod.PATCH),
                any(HttpEntity.class),
                eq(Void.class)
        );
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

}
