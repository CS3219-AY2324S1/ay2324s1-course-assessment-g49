package com.peerprep.peerprepapigateway.repository;

import com.peerprep.peerprepapigateway.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findFirstByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
