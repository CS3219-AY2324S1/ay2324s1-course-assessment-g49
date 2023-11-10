package com.peerprep.peerprepapigateway.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Value;

@Value
@NoArgsConstructor(force = true)
@RequiredArgsConstructor
public class CreateUserRequest {

    @NotBlank(message = "username is mandatory")
    String username;

    @NotBlank(message = "email is mandatory")
    String email;

    @NotBlank(message = "country is mandatory")
    String country;

    @NotBlank(message = "password is mandatory")
    String password;
}
