package com.peerprep.peerprepcommon.dto.question;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.util.Set;

@Value
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class QuestionResponse {
    String id;
    String title;
    String description;
    Set<Category> categories;
    Complexity complexity;
}
