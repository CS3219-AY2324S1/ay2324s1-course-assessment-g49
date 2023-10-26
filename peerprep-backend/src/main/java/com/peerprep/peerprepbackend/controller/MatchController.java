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
    public void match(@Valid @RequestBody final MatchRequest request) throws InvalidFormatException {
        this.simpMessagingTemplate.convertAndSend("/topic/match", new TestWebsocketReplyResponse("from backend websocket: " + HtmlUtils.htmlEscape(String.valueOf(request.getComplexity()))));
    }

//    @MessageMapping("/match")
//    @SendTo("/topic/timeout")
//    public Greeting matchTimeout(HelloMessage message) throws Exception {
//        Thread.sleep(1000); // simulated delay
//        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
//    }
}
