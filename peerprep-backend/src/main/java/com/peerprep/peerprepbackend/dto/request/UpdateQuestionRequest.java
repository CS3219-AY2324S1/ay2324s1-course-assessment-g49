package com.peerprep.peerprepbackend.dto.request;

import com.peerprep.peerprepbackend.common.Category;
import com.peerprep.peerprepbackend.common.Complexity;
import jakarta.validation.constraints.Size;
import lombok.NoArgsConstructor;
import lombok.Value;
import org.hibernate.validator.constraints.Length;

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
