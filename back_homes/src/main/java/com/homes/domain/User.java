package com.homes.domain;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class User {
    private Long userId;
    private String email;
    private String passwordHash;
    private String name;
    private String userType;
    private String role;
    private String contractImageUrl;
    private String verifiedStatus;
    private LocalDateTime verifiedAt;
    private String rejectReason;
    private Boolean isDeleted;
    private LocalDateTime deletedAt;
    private LocalDateTime createdAt;
}