package com.peerprep.peerprepcommon.dto.attempt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttemptDTO {
    String sessionId;
    String questionId;
    long epochTimestamp;  // milliseconds
}
