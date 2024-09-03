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
    String userName;
    String userEmail;
    String userSurname;

    public AuthResponse(String accessToken, Integer userId, String refreshToken, String role,String userName, String userEmail, String userSurname) {
        this.accessToken = accessToken;
        this.userId = userId;
        this.refreshToken = refreshToken;
        this.role = role;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userSurname = userSurname;
    }
}