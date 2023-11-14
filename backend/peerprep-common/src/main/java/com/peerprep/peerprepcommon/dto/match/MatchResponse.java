package com.peerprep.peerprepcommon.dto.match;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MatchResponse {
    private String matchedWithUser;
    private String sessionId;
    private String questionId;
    private String roomId;
}
