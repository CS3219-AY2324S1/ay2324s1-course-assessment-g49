package com.peerprep.peerprepbackend.dto.response;

import com.peerprep.peerprepbackend.common.Category;
import com.peerprep.peerprepbackend.common.Complexity;
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
