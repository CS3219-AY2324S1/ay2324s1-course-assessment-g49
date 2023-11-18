package com.peerprep.peerprepsessionservice.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "attempt")
public class Attempt {

    @Id
    private String id;

    private String userId;

    private String sessionId;

    private String questionId;

    private long epochTimestamp;

}
