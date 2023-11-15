package com.peerprep.peerprepsessionservice.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "session")
public class Session {

    @Id
    private String id;

    private String userId1;

    private String userId2;

    private String questionId;

    private String roomId;

    private Boolean isActive;

}
