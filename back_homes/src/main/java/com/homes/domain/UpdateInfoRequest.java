package com.homes.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateInfoRequest {
    private String name;
    private String phone;
    private String password;
}