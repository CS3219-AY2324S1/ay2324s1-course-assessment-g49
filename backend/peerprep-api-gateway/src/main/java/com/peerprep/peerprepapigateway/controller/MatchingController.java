package com.peerprep.peerprepapigateway.controller;

import com.peerprep.peerprepcommon.dto.match.MatchRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class MatchingController {


    @MessageMapping("/match")
    public String submitMatch(@Valid @RequestBody MatchRequest request) {
        return "";
    }

}
