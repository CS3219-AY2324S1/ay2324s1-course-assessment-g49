package com.peerprep.peerprepcommon.dto.question;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.util.Set;

/**
 * Data transfer object representing the overview of a question
 */
@Value
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class QuestionOverview {
    String id;
    String title;
    Set<Category> categories;
    Complexity complexity;
}
