package com.peerprep.peerprepapigateway.service;

import com.peerprep.peerprepapigateway.dto.request.RegisterRequest;
import com.peerprep.peerprepapigateway.dto.request.UpdateUserRequest;
import com.peerprep.peerprepapigateway.dto.response.LoginResponse;
import com.peerprep.peerprepapigateway.dto.response.UserResponse;
import com.peerprep.peerprepapigateway.entity.Role;
import com.peerprep.peerprepapigateway.entity.User;
import com.peerprep.peerprepapigateway.exception.*;
import com.peerprep.peerprepapigateway.repository.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    @Value("${spring.application.name}")
    private String appName;

    /**
     * Authenticate credentials using configured AuthenticationManager
     */
    public LoginResponse authenticateUser(String username, String password) throws BadCredentialsException {

        User user = userRepository.findFirstByUsername(username)
                .orElseThrow(() -> new BadCredentialsException("Bad credentials"));

        // throws AuthenticationException if fails
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user, password, user.getAuthorities()));

        String token = JWT.create()
                .withIssuer(appName)
                .withSubject(user.getId().toString())
                .withClaim("role", user.getRole().name())
                .withExpiresAt(Instant.now().plusSeconds(jwtExpiration))
                .sign(Algorithm.HMAC256(jwtSecret));

        return LoginResponse.builder()
                .jwt(token)
                .build();
    }

    public Long createUser(RegisterRequest request) throws UsernameExistsException, EmailExistsException {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UsernameExistsException(request.getUsername());
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailExistsException(request.getEmail());
        }
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .country(request.getCountry())
                .role(Role.USER)
                .build();
        return userRepository.save(user).getId();
    }

    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
    }

    public List<UserResponse> getUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(u -> UserResponse.builder()
                        .id(u.getId())
                        .username(u.getUsername())
                        .email(u.getEmail())
                        .country(u.getCountry())
                        .build())
                .collect(Collectors.toList());
    }

    public UserResponse getUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .country(user.getCountry())
                .build();
    }

    public void updateUser(String id, UpdateUserRequest request) throws UsernameExistsException, EmailExistsException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        if (request.getUsername() != null && !request.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new UsernameExistsException(request.getUsername());
            }
            user.setUsername(request.getUsername());
        }
        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new EmailExistsException(request.getEmail());
            }
            user.setEmail(request.getEmail());
        }
        if (request.getCountry() != null && !request.getCountry().equals(user.getCountry())) {
            user.setCountry(request.getCountry());
        }
        if (request.getPassword() != null) {
            user.setPassword(request.getPassword());
        }
        userRepository.save(user);
    }
}
