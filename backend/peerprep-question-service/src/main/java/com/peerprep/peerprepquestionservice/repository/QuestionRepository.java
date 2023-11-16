package com.peerprep.peerprepquestionservice.repository;

import com.peerprep.peerprepcommon.dto.question.Category;
import com.peerprep.peerprepcommon.dto.question.Complexity;
import com.peerprep.peerprepquestionservice.entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findQuestionByComplexityAndCategoriesContaining(Complexity complexity, Category category);
}
