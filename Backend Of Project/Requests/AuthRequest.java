package com.local.onlineshoppingproject.Requests;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;


}