package com.peerprep.peerprepbackend.dto.response;

import com.peerprep.peerprepbackend.common.Category;
import com.peerprep.peerprepbackend.common.Complexity;
import lombok.Builder;
import lombok.Value;

import java.util.Set;

/**
 * Data transfer object representing the overview of a question
 */
@Value
@Builder
public class QuestionOverview {
    String id;
    String title;
    String description;
    Set<Category> categories;
    Complexity complexity;
}
