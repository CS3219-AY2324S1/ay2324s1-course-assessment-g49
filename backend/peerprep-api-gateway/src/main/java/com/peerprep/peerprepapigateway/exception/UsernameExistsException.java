package com.peerprep.peerprepapigateway.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.naming.AuthenticationException;

@RequiredArgsConstructor
@Getter
public class UsernameExistsException extends AuthenticationException {
    private final String username;
}
