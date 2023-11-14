package com.peerprep.peerprepsessionservice.repository;

import com.peerprep.peerprepsessionservice.entity.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends MongoRepository<Session, String> {
}
