package com.peerprep.peerprepquestionservice.service;

import com.peerprep.peerprepcommon.dto.question.*;
import com.peerprep.peerprepquestionservice.entity.Question;
import com.peerprep.peerprepquestionservice.exception.NoSuitableQuestionException;
import com.peerprep.peerprepquestionservice.exception.QuestionNotFoundException;
import com.peerprep.peerprepquestionservice.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
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

    public String getRandomQuestion(RandomQuestionRequest request) throws NoSuitableQuestionException {
        List<Question> questions = questionRepository.findQuestionByComplexityAndCategoriesContaining(request.getComplexity(), request.getCategory());
        if (questions.isEmpty()) {
            throw new NoSuitableQuestionException();
        }
        Random random = new Random();
        int randomIndex = random.nextInt(questions.size()); // Generates a random index
        Question randomQuestion = questions.get(randomIndex);
        return randomQuestion.getId();
    }

    public void deleteQuestion(String id) {
        if (!questionRepository.existsById(id)) {
            throw new QuestionNotFoundException(id);
        }
        questionRepository.deleteById(id);
    }

    public void updateQuestion(String id, UpdateQuestionRequest request) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException(id));
        if (request.getTitle() != null) {
            question.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            question.setDescription(request.getDescription());
        }
        if (request.getCategories() != null) {
            question.setCategories(request.getCategories());
        }
        if (request.getComplexity() != null) {
            question.setComplexity(request.getComplexity());
        }
        questionRepository.save(question);
    }

}
