package com.peerprep.peerprepbackend.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.security.auth.login.FailedLoginException;

@RequiredArgsConstructor
@Getter
public class BadCredentialsException extends FailedLoginException {
}
