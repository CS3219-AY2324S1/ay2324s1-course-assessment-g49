package com.peerprep.peerprepapigateway.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class QuestionNotFoundException extends RuntimeException {
    private final String id;
}
