package com.peerprep.peerprepbackend.dto.request;

import com.peerprep.peerprepbackend.common.Category;
import com.peerprep.peerprepbackend.common.Complexity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;
import lombok.Value;

import java.util.Set;

@Value
@NoArgsConstructor(force = true)
public class CreateQuestionRequest {

    @NotBlank(message = "title is mandatory")
    String title;

    @NotBlank(message = "description is mandatory")
    String description;

    @NotEmpty(message = "categories are mandatory")
    Set<Category> categories;

    @NotNull(message = "complexity is mandatory")
    Complexity complexity;

}
