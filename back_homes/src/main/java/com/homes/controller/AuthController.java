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

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest req) {
        userService.register(req);
        return ResponseEntity.ok("회원가입 완료");
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest req) {

        // 1. 이메일로 유저 조회
        User user = userService.findByEmail(req.getEmail());

        // 2. 유저 없으면 실패
        if (user == null) {
            return ResponseEntity.status(401).body("존재하지 않는 이메일입니다.");
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