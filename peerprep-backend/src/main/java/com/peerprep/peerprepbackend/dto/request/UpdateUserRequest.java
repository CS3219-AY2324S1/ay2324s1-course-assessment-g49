package com.peerprep.peerprepbackend.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class UpdateUserRequest {

    @Size(min = 1, message = "username cannot be empty")
    String username;

    @Size(min = 1, message = "email cannot be empty")
    String email;

    @Size(min = 1, message = "country cannot be empty")
    String country;

    @Size(min = 1, message = "password cannot be empty")
    String password;
}
