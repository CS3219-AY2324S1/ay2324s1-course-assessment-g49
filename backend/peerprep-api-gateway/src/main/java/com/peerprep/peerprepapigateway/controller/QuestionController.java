package com.peerprep.peerprepapigateway.controller;

import com.peerprep.peerprepcommon.dto.question.CreateQuestionRequest;
import com.peerprep.peerprepcommon.dto.question.QuestionOverview;
import com.peerprep.peerprepcommon.dto.question.QuestionResponse;
import com.peerprep.peerprepcommon.dto.question.UpdateQuestionRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/question")
@RequiredArgsConstructor
public class QuestionController {

    private final RestTemplate restTemplate;

    @Value("${peerprep.question-service.url}")
    private String questionServiceUrl;

    @PostMapping
    public ResponseEntity<String> createQuestion(@RequestBody @Valid final CreateQuestionRequest request) {
        return restTemplate.postForEntity(questionServiceUrl, request, String.class);
    }

    @GetMapping
    public ResponseEntity<List<QuestionOverview>> getQuestions() {
        return restTemplate.exchange(
                questionServiceUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {
                }
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponse> getQuestion(@PathVariable final String id) {
        String specificUrl = questionServiceUrl + "/" + id;
        return restTemplate.getForEntity(specificUrl, QuestionResponse.class);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable final String id) {
        String specificUrl = questionServiceUrl + "/" + id;
        restTemplate.delete(specificUrl);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateQuestion(@PathVariable final String id, @RequestBody @Valid final UpdateQuestionRequest request) {
        String specificUrl = questionServiceUrl + "/" + id;
        restTemplate.exchange(
                specificUrl,
                HttpMethod.PATCH,
                new HttpEntity<>(request),
                Void.class
        );
        return ResponseEntity.noContent().build();
    }
}
