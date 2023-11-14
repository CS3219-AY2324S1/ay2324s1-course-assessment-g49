package com.peerprep.peerprepcommon.dto.session;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateSessionRequest {
    String userId1;
    String userId2;
    String questionId;
}
