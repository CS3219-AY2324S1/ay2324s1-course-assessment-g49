package com.peerprep.peerprepbackend.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Value;

@Value
public class TestWebsocketReplyResponse {

    String reply;

    @JsonCreator
    public TestWebsocketReplyResponse(@JsonProperty("reply") String reply) {
        this.reply = reply;
    }
}