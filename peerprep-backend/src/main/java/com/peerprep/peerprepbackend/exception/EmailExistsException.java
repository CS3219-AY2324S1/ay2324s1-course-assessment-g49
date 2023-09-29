package com.peerprep.peerprepbackend.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.naming.AuthenticationException;

@RequiredArgsConstructor
@Getter
public class EmailExistsException extends AuthenticationException {
    private final String email;
}
