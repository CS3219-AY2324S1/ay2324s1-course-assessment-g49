package com.peerprep.peerprepsessionservice.repository;

import com.peerprep.peerprepsessionservice.entity.Attempt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttemptRepository extends MongoRepository<Attempt, String> {

    List<Attempt> findAttemptByUserId(String userId);
}
