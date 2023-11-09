package com.peerprep.peerprepapigateway.dto.response;

import com.peerprep.peerprepapigateway.common.Category;
import com.peerprep.peerprepapigateway.common.Complexity;
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
    Set<Category> categories;
    Complexity complexity;
}
