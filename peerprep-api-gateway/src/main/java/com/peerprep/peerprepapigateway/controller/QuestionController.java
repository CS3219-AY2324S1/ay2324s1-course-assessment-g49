package com.peerprep.peerprepapigateway.controller;

import com.peerprep.peerprepapigateway.dto.request.CreateQuestionRequest;
import com.peerprep.peerprepapigateway.dto.request.UpdateQuestionRequest;
import com.peerprep.peerprepapigateway.dto.response.QuestionOverview;
import com.peerprep.peerprepapigateway.dto.response.QuestionResponse;
import com.peerprep.peerprepapigateway.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/question")
@RequiredArgsConstructor
public class QuestionController {


    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<String> createQuestion(@RequestBody @Valid final CreateQuestionRequest request) {
        String id = questionService.createQuestion(request);
        return ResponseEntity.status(201).body(id);
    }

    @GetMapping
    public ResponseEntity<List<QuestionOverview>> getQuestions() {
        List<QuestionOverview> questions = questionService.getQuestions();
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponse> getQuestion(@PathVariable final String id) {
        QuestionResponse question = questionService.getQuestion(id);
        return ResponseEntity.ok(question);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable final String id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateQuestion(@PathVariable final String id, @RequestBody @Valid final UpdateQuestionRequest request) {
        questionService.updateQuestion(id, request);
        return ResponseEntity.ok().build();
    }
}
