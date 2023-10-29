package com.peerprep.peerprepbackend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@NoArgsConstructor(force = true)
public class RegisterRequest {

    @NotBlank(message = "username is mandatory")
    String username;

    @NotBlank(message = "email is mandatory")
    String email;

    @NotBlank(message = "country is mandatory")
    String country;

    @NotBlank(message = "password is mandatory")
    String password;
}
