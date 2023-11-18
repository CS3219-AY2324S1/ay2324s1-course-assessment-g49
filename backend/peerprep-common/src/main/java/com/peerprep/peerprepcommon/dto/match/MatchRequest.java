package com.peerprep.peerprepcommon.dto.match;

import com.peerprep.peerprepcommon.dto.question.Category;
import com.peerprep.peerprepcommon.dto.question.Complexity;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.io.Serializable;

@Value
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class MatchRequest implements Serializable {

    @NotNull(message = "must specify create or cancel")
    Boolean isCreate;

    @NotNull(message = "userId is mandatory")
    String userId;

    @NotNull(message = "complexity is mandatory")
    Complexity complexity;

    @NotNull(message = "category is mandatory")
    Category category;
}
