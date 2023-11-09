package com.peerprep.peerprepapigateway.dto.response;

import com.peerprep.peerprepapigateway.common.Category;
import com.peerprep.peerprepapigateway.common.Complexity;
import lombok.Builder;
import lombok.Value;

import java.util.Set;

@Value
@Builder
public class QuestionResponse {
    String id;
    String title;
    String description;
    Set<Category> categories;
    Complexity complexity;
}
