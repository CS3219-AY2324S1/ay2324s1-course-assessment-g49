package com.peerprep.peerprepbackend.service;

import com.peerprep.peerprepbackend.dto.request.CreateUserRequest;
import com.peerprep.peerprepbackend.dto.request.UpdateUserRequest;
import com.peerprep.peerprepbackend.dto.response.LoginResponse;
import com.peerprep.peerprepbackend.dto.response.UserResponse;
import com.peerprep.peerprepbackend.entity.User;
import com.peerprep.peerprepbackend.exception.*;
import com.peerprep.peerprepbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public LoginResponse authenticateUser(String username, String password) throws BadCredentialsException {
        User user = userRepository.findFirstByUsername(username).orElseThrow(BadCredentialsException::new);
        if (!Objects.equals(user.getPassword(), password)) {
            throw new BadCredentialsException();
        }
        return LoginResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }

    public Long createUser(CreateUserRequest request) throws UsernameExistsException, EmailExistsException {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UsernameExistsException(request.getUsername());
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailExistsException(request.getEmail());
        }
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .country(request.getCountry())
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
