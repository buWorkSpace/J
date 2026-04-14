package com.homes.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest{
    private String email;
    private String password;
}