package com.peerprep.peerprepbackend.controller;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.peerprep.peerprepbackend.dto.request.CreateUserRequest;
import com.peerprep.peerprepbackend.dto.request.MatchRequest;
import com.peerprep.peerprepbackend.dto.request.TestWebsocketMessageRequest;
import com.peerprep.peerprepbackend.dto.response.TestWebsocketReplyResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;


@RestController
@RequiredArgsConstructor
public class MatchController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/match")
    @SendTo("/topic/matching")
    public TestWebsocketReplyResponse greeting(TestWebsocketMessageRequest message) throws Exception {
        Thread.sleep(1000);
        return new TestWebsocketReplyResponse("from backend websocket: " + HtmlUtils.htmlEscape(message.getMessage()));
    }

}
