package com.peerprep.peerprepcommon.dto.user;

import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@NoArgsConstructor(force = true)
public class LoginRequest {

    String username;
    String password;

}
