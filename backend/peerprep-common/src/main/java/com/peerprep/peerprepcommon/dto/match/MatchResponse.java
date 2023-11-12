package com.peerprep.peerprepcommon.dto.match;

import com.peerprep.peerprepcommon.dto.question.Category;
import com.peerprep.peerprepcommon.dto.question.Complexity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class MatchResponse {
    private String matchedWithUser;
    private String meetingId;
    private Complexity complexity;
    private Category category;
}
