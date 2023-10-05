package com.peerprep.peerprepbackend.config;

import com.peerprep.peerprepbackend.exception.UserNotFoundException;
import com.peerprep.peerprepbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserRepository userRepository;

    /**
     * Provides an instance of AuthenticationManager bean
     * AuthenticationManager = collection of AuthenticationProvider
     * Default implementation of AuthenticationManager is ProviderManager
     *
     * @param config AuthenticationConfiguration bean is already present in Spring Context
     * @return default AuthenticationManager which is predefined in Spring Context
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Provides an instance of a BCryptPassword encoder which provides a method to hash a password string
     * using bcrypt hashing function
     *
     * @return BCryptPossword encoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Provides an instance of DaoAuthenticationProvider, which is a type of AuthenticationProvider designated to
     * authenticate user information stored in a database
     *
     * @param userDetailsService
     * @return
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserDetailsService userDetailsService) {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        return daoAuthenticationProvider;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findFirstByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));
    }

}
