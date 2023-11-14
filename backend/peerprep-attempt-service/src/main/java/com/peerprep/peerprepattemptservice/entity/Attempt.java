package com.peerprep.peerprepattemptservice.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "attempt")
public class Attempt {

    @Id
    String id;

    String userId;

    String sessionId;

    String questionId;

    long epochTimestamp;

}
