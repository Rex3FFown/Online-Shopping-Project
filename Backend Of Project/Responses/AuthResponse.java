package com.local.onlineshoppingproject.Responses;

import com.local.onlineshoppingproject.Services.CustomerService;
import lombok.Data;
import org.springframework.web.bind.annotation.PathVariable;

@Data
public class AuthResponse {

    String role;
    Integer userId;
    String accessToken;
    String refreshToken;
private CustomerService customerService;
    public AuthResponse(String accessToken, Integer userId, String refreshToken,String role) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.refreshToken = refreshToken;
        this.role = role ;
    }
}