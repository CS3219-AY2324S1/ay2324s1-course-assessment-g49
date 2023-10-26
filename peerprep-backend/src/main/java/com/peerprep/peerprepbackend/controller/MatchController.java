package com.peerprep.peerprepbackend.controller;

import com.peerprep.peerprepbackend.dto.request.TestWebsocketMessageRequest;
import com.peerprep.peerprepbackend.dto.response.TestWebsocketReplyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;


@RestController
@RequiredArgsConstructor
public class MatchController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/match")
    public void greeting(TestWebsocketMessageRequest message) throws Exception {
        Thread.sleep(1000);
        this.simpMessagingTemplate.convertAndSend("/topic/match", new TestWebsocketReplyResponse("from backend websocket: " + HtmlUtils.htmlEscape(message.getMessage())));
    }

//    @MessageMapping("/match")
//    @SendTo("/topic/timeout")
//    public Greeting matchTimeout(HelloMessage message) throws Exception {
//        Thread.sleep(1000); // simulated delay
//        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
//    }
}
