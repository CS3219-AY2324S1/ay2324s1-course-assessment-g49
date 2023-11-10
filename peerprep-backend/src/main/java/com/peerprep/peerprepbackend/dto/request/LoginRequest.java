package com.peerprep.peerprepbackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class LoginRequest {

    String username;
    String password;

}
