package com.peerprep.peerprepcommon.dto.question;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

import java.util.Set;

@Value
@Builder
@AllArgsConstructor
public class QuestionResponse {
    String id;
    String title;
    String description;
    Set<Category> categories;
    Complexity complexity;
}
