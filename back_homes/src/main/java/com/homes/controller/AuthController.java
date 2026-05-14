package com.homes.controller;

import com.homes.domain.LoginRequest;
import com.homes.domain.RegisterRequest;
import com.homes.domain.User;
import com.homes.security.JwtUtil;
import com.homes.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    @PostMapping(value = "/register", consumes = {"multipart/form-data"})
    public ResponseEntity<String> register(
            @RequestPart("email") String email,
            @RequestPart("password") String password,
            @RequestPart("name") String name,
            @RequestPart("phone") String phone,
            @RequestPart(value = "contractFile", required = false) MultipartFile contractFile
    ) throws IOException {
        RegisterRequest req = new RegisterRequest();
        req.setEmail(email);
        req.setPassword(password);
        req.setName(name);
        req.setPhone(phone);
        req.setContractFile(contractFile);
        userService.register(req);
        return ResponseEntity.ok("회원가입 완료");
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest req) {

        // 1. 이메일 또는 전화번호로 유저 조회
        User user = null;
        if (req.getEmail() != null && !req.getEmail().isEmpty()) {
            user = userService.findByEmail(req.getEmail());
        }else if (req.getPhone() != null && !req.getPhone().isEmpty()) {
            user = userService.findByPhone(req.getPhone());
        }

        // 2. 유저 없으면 실패
        if (user == null) {
            return ResponseEntity.status(401).body("존재하지 않는 계정입니다.");
        }

        // 3. 비밀번호 검증
        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body("비밀번호가 일치하지 않습니다.");
        }

        // 4. JWT 발급
        String token = jwtUtil.generateToken(user.getUserId(), user.getRole(), user.getVerifiedStatus());
        return ResponseEntity.ok(token);
    }
}