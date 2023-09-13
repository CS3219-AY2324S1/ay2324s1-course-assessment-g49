package com.peerprep.peerprepbackend.controller;

import com.peerprep.peerprepbackend.dto.request.CreateQuestionRequest;
import com.peerprep.peerprepbackend.dto.response.QuestionOverview;
import com.peerprep.peerprepbackend.dto.response.QuestionResponse;
import com.peerprep.peerprepbackend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
@RequiredArgsConstructor
public class QuestionController {


    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<String> createQuestion(@RequestBody final CreateQuestionRequest request) {
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
}
