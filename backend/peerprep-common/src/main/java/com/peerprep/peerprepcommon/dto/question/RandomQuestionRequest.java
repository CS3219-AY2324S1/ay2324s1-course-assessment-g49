package com.peerprep.peerprepcommon.dto.question;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RandomQuestionRequest {
    private Complexity complexity;
    private Category category;
}
