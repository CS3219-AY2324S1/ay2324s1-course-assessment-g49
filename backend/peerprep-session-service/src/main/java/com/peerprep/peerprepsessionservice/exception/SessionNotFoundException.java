package com.peerprep.peerprepsessionservice.exception;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SessionNotFoundException extends Exception {
    private final String id;
}
