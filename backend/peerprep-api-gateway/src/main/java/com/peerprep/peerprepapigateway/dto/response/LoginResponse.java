package com.peerprep.peerprepapigateway.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@AllArgsConstructor
public class LoginResponse {
    String jwt;
}
