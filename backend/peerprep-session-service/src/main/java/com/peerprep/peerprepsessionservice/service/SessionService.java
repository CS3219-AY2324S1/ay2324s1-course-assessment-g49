package com.peerprep.peerprepsessionservice.service;

import com.peerprep.peerprepcommon.dto.session.CreateSessionRequest;
import com.peerprep.peerprepcommon.dto.session.SessionDTO;
import com.peerprep.peerprepsessionservice.dto.CreateRoomResponse;
import com.peerprep.peerprepsessionservice.entity.Session;
import com.peerprep.peerprepsessionservice.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepository sessionRepository;

    private final RestTemplate restTemplate;

    @Value("${video-sdk.create-room.url}")
    private String createRoomUrl;

    @Value("${video-sdk.jwt}")
    private String videoSdkJwt;

    public SessionDTO createSession(CreateSessionRequest request) {
        // get meeting id from VideoSDK
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.AUTHORIZATION, videoSdkJwt);
        RequestEntity<Void> requestEntity = new RequestEntity<>(headers, HttpMethod.POST, URI.create(createRoomUrl));
        ResponseEntity<CreateRoomResponse> response = restTemplate.exchange(requestEntity, CreateRoomResponse.class);
        String roomId = response.getBody().getRoomId();

        // create session
        Session session = Session.builder()
                .userId1(request.getUserId1())
                .userId2(request.getUserId2())
                .questionId(request.getQuestionId())
                .isActive(true)
                .roomId(roomId)
                .build();
        String id = sessionRepository.save(session).getId();

        return new SessionDTO(id, session.getUserId1(), session.getUserId2(), session.getQuestionId(), session.getRoomId(), session.getIsActive());
    }

}
