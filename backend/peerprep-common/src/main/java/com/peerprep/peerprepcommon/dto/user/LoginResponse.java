package com.peerprep.peerprepcommon.dto.user;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LoginResponse {
    Long id;
    String username;
}
