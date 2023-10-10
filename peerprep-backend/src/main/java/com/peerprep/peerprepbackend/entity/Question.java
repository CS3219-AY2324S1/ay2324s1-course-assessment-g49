package com.peerprep.peerprepbackend.entity;

import com.peerprep.peerprepbackend.common.Category;
import com.peerprep.peerprepbackend.common.Complexity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

/**
 * Entity class representing a question document in MongoDB
 * To be stored in the "questions" collection
 */
@Data
@Builder
@Document(collection = "question")
public class Question {

    @Id
    String id;

    @NotBlank(message = "title is mandatory")
    String title;

    @NotBlank(message = "description is mandatory")
    String description;

    @NotEmpty(message = "categories are mandatory")
    Set<Category> categories;

    @NotNull(message = "complexity is mandatory")
    Complexity complexity;

}