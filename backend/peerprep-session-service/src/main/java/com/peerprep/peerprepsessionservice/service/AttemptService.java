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

    public void createAttempt(AttemptDTO request) throws SessionNotFoundException {
        Attempt attempt = Attempt.builder()
                .userId(request.getUserId())
                .sessionId(request.getSessionId())
                .questionId(request.getQuestionId())
                .epochTimestamp(request.getEpochTimestamp())
                .build();
        attemptRepository.save(attempt);
    }

    public List<AttemptDTO> getAllAttempts(String userId) {
        List<Attempt> attempts = attemptRepository.findAttemptByUserId(userId);
        return attempts.stream()
                .map(a -> new AttemptDTO(a.getUserId(), a.getSessionId(), a.getQuestionId(), a.getEpochTimestamp()))
                .collect(Collectors.toList());
    }
}
