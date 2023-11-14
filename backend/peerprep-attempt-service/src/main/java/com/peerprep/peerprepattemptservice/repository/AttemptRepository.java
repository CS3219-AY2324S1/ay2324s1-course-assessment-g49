package com.peerprep.peerprepattemptservice.repository;

import com.peerprep.peerprepattemptservice.entity.Attempt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttemptRepository extends MongoRepository<String, Attempt> {
}
