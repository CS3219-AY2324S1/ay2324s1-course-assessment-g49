package com.peerprep.peerprepcommon.dto.match;

import com.peerprep.peerprepcommon.dto.question.Category;
import com.peerprep.peerprepcommon.dto.question.Complexity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MatchResult {
    private String userId1;
    private String userId2;
    private Complexity complexity;
    private Category category;
}
