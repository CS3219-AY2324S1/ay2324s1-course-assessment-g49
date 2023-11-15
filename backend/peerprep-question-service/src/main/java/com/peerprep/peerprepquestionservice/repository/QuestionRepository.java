package com.peerprep.peerprepquestionservice.repository;

import com.peerprep.peerprepquestionservice.entity.Question;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {

    @Aggregation(pipeline = {"{$sample:{size:1}}"})
    AggregationResults<Question> random();
}
