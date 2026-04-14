package com.homes.mapper;

import com.homes.domain.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    void insertUser(User user);
    User findByEmail(String email);
}