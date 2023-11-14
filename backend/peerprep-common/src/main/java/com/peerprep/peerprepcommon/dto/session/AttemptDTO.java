package com.peerprep.peerprepcommon.dto.session;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttemptDTO {
    String userId;
    String sessionId;
    String questionId;
    long epochTimestamp;  // milliseconds
}
