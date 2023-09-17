package com.peerprep.peerprepbackend.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

/**
 * Entity class representing a user profile row in PostgreSQL
 * To be stored in the "users" table
 */

@Data
@Builder
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    private String email;
    private String country;

    protected User() {}
}
