package com.peerprep.peerprepsessionservice.service;

import com.peerprep.peerprepcommon.dto.session.AttemptDTO;
import com.peerprep.peerprepsessionservice.entity.Attempt;
import com.peerprep.peerprepsessionservice.entity.Session;
import com.peerprep.peerprepsessionservice.exception.SessionNotFoundException;
import com.peerprep.peerprepsessionservice.repository.AttemptRepository;
import com.peerprep.peerprepsessionservice.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttemptService {

    private final AttemptRepository attemptRepository;

    private final SessionRepository sessionRepository;

    public void createAttempt(AttemptDTO request) throws SessionNotFoundException {
        // get session to identify both users
        Session session = sessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new SessionNotFoundException(request.getSessionId()));
        String userId1 = session.getUserId1();
        String userId2 = session.getUserId2();

        Attempt user1Attempt = Attempt.builder()
                .userId(userId1)
                .sessionId(request.getSessionId())
                .questionId(request.getQuestionId())
                .epochTimestamp(request.getEpochTimestamp())
                .build();
        Attempt user2Attempt = Attempt.builder()
                .userId(userId2)
                .sessionId(request.getSessionId())
                .questionId(request.getQuestionId())
                .epochTimestamp(request.getEpochTimestamp())
                .build();
        attemptRepository.save(user1Attempt);
        attemptRepository.save(user2Attempt);
    }

    public List<AttemptDTO> getAllAttempts(String userId) {
        List<Attempt> attempts = attemptRepository.findAttemptByUserId(userId);
        return attempts.stream()
                .map(a -> new AttemptDTO(a.getUserId(), a.getSessionId(), a.getQuestionId(), a.getEpochTimestamp()))
                .collect(Collectors.toList());
    }
}
