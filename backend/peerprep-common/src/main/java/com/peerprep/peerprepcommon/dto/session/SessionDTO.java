package com.peerprep.peerprepcommon.dto.session;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionDTO {

    private String id;

    private String userId1;

    private String userId2;

    private String questionId;

    private String roomId;

    private Boolean isActive;

}
