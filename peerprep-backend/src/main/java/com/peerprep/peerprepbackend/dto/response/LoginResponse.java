package com.peerprep.peerprepbackend.dto.response;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LoginResponse {
    Long id;
    String username;
}
