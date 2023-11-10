package com.peerprep.peerprepcommon.dto.question;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.Value;

import java.util.Set;

/**
 * Data transfer object representing the overview of a question
 */
@Value
@Builder
@AllArgsConstructor
public class QuestionOverview {
    String id;
    String title;
    Set<Category> categories;
    Complexity complexity;
}
