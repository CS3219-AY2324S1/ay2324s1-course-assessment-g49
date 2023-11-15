package com.peerprep.peerprepapigateway.gateway;

import com.peerprep.peerprepapigateway.entity.User;
import com.peerprep.peerprepcommon.dto.session.AttemptDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attempt")
public class AttemptGateway {

    private final RestTemplate restTemplate;

    @Value("${peerprep.session-service.url}")
    private String sessionServiceUrl;

    @PostMapping
    public ResponseEntity<String> createAttempt(@RequestBody AttemptDTO attempt) {
        return restTemplate.postForEntity(sessionServiceUrl + "/attempt", attempt, String.class);
    }

    @GetMapping
    public ResponseEntity<List<AttemptDTO>> getAttempts() {
        long userId = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        String url = sessionServiceUrl + "/attempt/" + userId;
        return restTemplate.exchange(url, HttpMethod.GET,
                null, new ParameterizedTypeReference<>() {});

    }

}
