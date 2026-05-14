package com.homes.service;

import com.homes.domain.RegisterRequest;
import com.homes.domain.UpdateInfoRequest;
import com.homes.domain.User;
import com.homes.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;


    // 회원가입
    public void register(RegisterRequest req) throws IOException {


        // 이메일 형식 검증
        if (!req.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new IllegalArgumentException("이메일 형식이 올바르지 않습니다.");
        }

        // 이메일 중복 검사
        if (userMapper.findByEmail(req.getEmail()) != null) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        // 전화번호 중복 검사
        if (req.getPhone() != null && userMapper.findByPhone(req.getPhone()) != null) {
            throw new IllegalArgumentException("이미 사용 중인 전화번호입니다.");
        }

        String savedFileName = null;
        MultipartFile file = req.getContractFile();
        if (file != null && !file.isEmpty()) {
            String uploadDir = "uploads/contracts/";
            Files.createDirectories(Paths.get(uploadDir));
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            file.transferTo(Paths.get(uploadDir + fileName));
            // 필요하면 fileName을 DB에 저장
        }

        User user = new User();
        user.setEmail(req.getEmail());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword())); //암호화
        user.setName(req.getName());
        user.setPhone(req.getPhone());
        user.setContractFile(savedFileName);
        userMapper.insertUser(user);

    }

    //이메일 계정조회
    public User findByEmail(String email){
        return userMapper.findByEmail(email);
    }
    public User findByPhone(String phone){ return  userMapper.findByPhone(phone); }
    public User findByUserId(Long userId) { return userMapper.findByUserId(userId); }

    public void updateUser(Long userId, UpdateInfoRequest req) {
        User user = userMapper.findByUserId(userId);

        if (req.getName() != null) user.setName(req.getName());
        if (req.getPhone() != null) user.setPhone(req.getPhone());
        if (req.getPassword() != null) user.setPasswordHash(passwordEncoder.encode(req.getPassword()));

        userMapper.updateUser(user);
    }
}
