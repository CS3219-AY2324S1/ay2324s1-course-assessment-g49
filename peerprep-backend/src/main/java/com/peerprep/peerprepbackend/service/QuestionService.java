package com.peerprep.peerprepbackend.service;

import com.peerprep.peerprepbackend.dto.request.CreateQuestionRequest;
import com.peerprep.peerprepbackend.dto.response.QuestionOverview;
import com.peerprep.peerprepbackend.dto.response.QuestionResponse;
import com.peerprep.peerprepbackend.entity.Question;
import com.peerprep.peerprepbackend.exception.QuestionNotFoundException;
import com.peerprep.peerprepbackend.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public String createQuestion(CreateQuestionRequest request) {
        Question question = Question.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .categories(request.getCategories())
                .complexity(request.getComplexity())
                .build();
        return questionRepository.save(question).getId();
    }

    public List<QuestionOverview> getQuestions() {
        List<Question> questions = questionRepository.findAll();
        return questions.stream().map(q -> QuestionOverview.builder()
                        .id(q.getId())
                        .title(q.getTitle())
                        .categories(q.getCategories())
                        .complexity(q.getComplexity())
                        .build())
                .collect(Collectors.toList());
    }

    public QuestionResponse getQuestion(String id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException(id));
        return QuestionResponse.builder()
                .id(question.getId())
                .title(question.getTitle())
                .description(question.getDescription())
                .categories(question.getCategories())
                .complexity(question.getComplexity())
                .build();
    }

    public void deleteQuestion(String id) {
        if (!questionRepository.existsById(id)) {
            throw new QuestionNotFoundException(id);
        }
        questionRepository.deleteById(id);
    }
}
