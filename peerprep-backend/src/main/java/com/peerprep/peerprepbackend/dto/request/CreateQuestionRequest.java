package com.peerprep.peerprepbackend.dto.request;

import com.peerprep.peerprepbackend.common.Category;
import com.peerprep.peerprepbackend.common.Complexity;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.util.Set;

@Value
@NoArgsConstructor(force = true)
public class CreateQuestionRequest {

    String title;
    String description;
    Set<Category> categories;
    Complexity complexity;

}
