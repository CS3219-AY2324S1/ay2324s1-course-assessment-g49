package com.peerprep.peerprepquestionservice.repository;

import com.peerprep.peerprepquestionservice.entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
}
