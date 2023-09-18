package com.peerprep.peerprepbackend.dto.request;

import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@NoArgsConstructor(force = true)
public class LoginRequest {

    String username;
    String email;
    String country;
    String password;

}
