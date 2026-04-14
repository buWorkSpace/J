package com.homes.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import static io.jsonwebtoken.security.Keys.hmacShaKeyFor;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "homes-secret-key-must-be-256bit-long!!";
    private final long EXPIRATION = 1000 * 60 * 60; // 1시간

    //JWT 생성
    public String generateToken(Long userId, String role, String verifiedStatus){
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("role", role)
                .claim("verifiedStatus", verifiedStatus)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    //userId 추출
    public Long extractUserId(String token){
        String subject = Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        return Long.valueOf(subject);
    }

    public boolean isValid(String token){
        try{
            Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        }catch (JwtException e){
            return false;
        }
    }
    private Key getKey(){
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }
}
