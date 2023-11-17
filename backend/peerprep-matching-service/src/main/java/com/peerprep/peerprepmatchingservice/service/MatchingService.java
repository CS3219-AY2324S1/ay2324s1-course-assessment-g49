package com.peerprep.peerprepmatchingservice.service;

import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import com.peerprep.peerprepcommon.dto.match.MatchResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class MatchingService {

    private final RestTemplate restTemplate;

    @Value("${peerprep.api-gateway.url}")
    private String apiGatewayUrl;

    public void processMatch(MatchRequest request1, MatchRequest request2) {
        String url = apiGatewayUrl + "/notify/result";
        MatchResult result = new MatchResult(request1.getUserId(), request2.getUserId(), request1.getComplexity(), request1.getCategory());
        log.info("MatchingService: sending back MatchResult to API Gateway: " + result.toString());
        restTemplate.postForEntity(url, result, Void.class);
    }
}
