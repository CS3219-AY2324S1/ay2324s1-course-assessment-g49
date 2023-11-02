package com.peerprep.peerprepbackend.controller;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.peerprep.peerprepbackend.dto.request.MatchRequest;
import com.peerprep.peerprepbackend.dto.response.TestWebsocketReplyResponse;
import com.peerprep.peerprepbackend.rabbitmq.RabbitMQSender;
import com.peerprep.peerprepbackend.service.MatchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;


@RestController
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    private RabbitMQSender sender;

    @Autowired
    public MatchController(MatchService matchService, RabbitMQSender sender) {
        this.matchService = matchService;
        this.sender = sender;
    }

    @MessageMapping("/match")
    @SendTo("/topic/match")
    public TestWebsocketReplyResponse match(@Valid @RequestBody final MatchRequest request) throws InvalidFormatException {
        matchService.matchUsers(request);
        return new TestWebsocketReplyResponse("from backend websocket: " + HtmlUtils.htmlEscape(String.valueOf(request.getComplexity())));
    }

    @GetMapping("/testqueue")
    public ResponseEntity<String> sendMessage() {
        sender.send();
        return ResponseEntity.ok("Message sent to RabbitMQ");
    }
//    @MessageMapping("/match")
//    @SendTo("/topic/timeout")
//    public Greeting matchTimeout(HelloMessage message) throws Exception {
//        Thread.sleep(1000); // simulated delay
//        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
//    }
}