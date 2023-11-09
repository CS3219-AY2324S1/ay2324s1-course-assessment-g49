package com.peerprep.peerprepcommon.dto.question;

import jakarta.validation.constraints.Size;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.util.Set;

@Value
@NoArgsConstructor(force = true)
public class UpdateQuestionRequest {

    @Size(min = 1, message = "title cannot be empty")
    String title;

    @Size(min = 1, message = "description cannot be empty")
    String description;

    @Size(min = 1, message = "must have at least 1 category")
    Set<Category> categories;

    Complexity complexity;

}
