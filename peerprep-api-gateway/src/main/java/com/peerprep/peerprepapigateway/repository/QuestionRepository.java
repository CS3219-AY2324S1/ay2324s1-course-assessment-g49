package com.peerprep.peerprepapigateway.repository;

import com.peerprep.peerprepapigateway.entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
}
