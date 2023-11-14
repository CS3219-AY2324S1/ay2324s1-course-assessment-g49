package com.peerprep.peerprepcommon.dto.match;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MatchResponse {
    private String matchedWithUser;
    private String sessionId;
    private String questionId;
    private String roomId;
}
