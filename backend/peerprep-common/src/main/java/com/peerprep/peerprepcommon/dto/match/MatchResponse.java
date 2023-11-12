package com.peerprep.peerprepcommon.dto.match;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class MatchResponse {
    private String matchedWithUser;
    private String meetingId;
}
