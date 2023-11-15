package com.peerprep.peerprepquestionservice.controller;

import com.peerprep.peerprepcommon.dto.question.CreateQuestionRequest;
import com.peerprep.peerprepcommon.dto.question.QuestionOverview;
import com.peerprep.peerprepcommon.dto.question.QuestionResponse;
import com.peerprep.peerprepcommon.dto.question.UpdateQuestionRequest;
import com.peerprep.peerprepquestionservice.exception.QuestionNotFoundException;
import com.peerprep.peerprepquestionservice.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:8080/", "https://api-gateway-dot-peerprep-399116.as.r.appspot.com/"})
@RestController
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

    @GetMapping("/random")
    public ResponseEntity<String> getRandomQuestion() {
        String id = questionService.getRandomQuestion();
        return ResponseEntity.ok(id);
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

    @ExceptionHandler(QuestionNotFoundException.class)
    public ResponseEntity<String> handleQuestionNotFoundException(QuestionNotFoundException e) {
        String msg = String.format("Question %s not found", e.getId());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
    }
}
