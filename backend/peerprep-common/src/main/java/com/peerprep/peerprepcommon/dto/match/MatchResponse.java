package com.peerprep.peerprepcommon.dto.match;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
public class MatchResponse {

    private String matchedWithUser;
    private String meetingId;
}
