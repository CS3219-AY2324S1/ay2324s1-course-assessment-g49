package com.peerprep.peerprepapigateway.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attempt")
public class AttemptController {

    private final RestTemplate restTemplate;

    @Value("${peerprep.attempt-service.url}")
    private String attemptServiceUrl;

}
