package com.homes.controller;

import com.homes.domain.UpdateInfoRequest;
import com.homes.domain.User;
import com.homes.security.JwtUtil;
import com.homes.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/my")
@RequiredArgsConstructor
public class MyPageController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    // 내 정보 조회
    @GetMapping("/info")
    public ResponseEntity<?> getMyInfo() {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByUserId(userId);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/info")
    public ResponseEntity<?> updateMyInfo(@RequestBody UpdateInfoRequest req) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.updateUser(userId, req);
        return ResponseEntity.ok("수정 완료");
    }
}