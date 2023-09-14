package com.peerprep.peerprepbackend.repository;

import com.peerprep.peerprepbackend.entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
}
