package com.peerprep.peerprepcommon.dto.match;

import com.peerprep.peerprepcommon.dto.question.Category;
import com.peerprep.peerprepcommon.dto.question.Complexity;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@NoArgsConstructor(force = true)
public class MatchRequest {

    @NotNull(message = "userId is mandatory")
    String userId;

    @NotNull(message = "complexity is mandatory")
    Complexity complexity;

    @NotNull(message = "category is mandatory")
    Category category;
}
