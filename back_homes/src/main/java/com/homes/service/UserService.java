package com.homes.service;

import com.homes.domain.RegisterRequest;
import com.homes.domain.User;
import com.homes.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    public void register(RegisterRequest req){
        User user = new User();
        user.setEmail(req.getEmail());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword())); //암호화
        user.setName(req.getName());
        user.setUserType(req.getUserType());
        userMapper.insertUser(user);
    }

    //이메일 계정조회
    public User findByEmail(String email){
        return userMapper.findByEmail(email);
    }
}
