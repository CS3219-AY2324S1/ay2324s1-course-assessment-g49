package com.peerprep.peerprepbackend.dto.request;

import com.peerprep.peerprepbackend.common.Complexity;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@NoArgsConstructor(force = true)
public class MatchRequest {

    @NotNull(message = "userId is mandatory")
    Long userId;

    @NotNull(message = "complexity is mandatory")
    Complexity complexity;
}
