package com.local.onlineshoppingproject.Services;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Entities.RefreshToken;
import com.local.onlineshoppingproject.Repositories.RefreshTokenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;



@Service
public class RefreshTokenService {

    @Value("${refresh.token.expires.in}")
    Long expireSeconds;

    private RefreshTokenRepo refreshTokenRepository;


    public RefreshTokenService(RefreshTokenRepo refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public String createRefreshToken(Customer customer) {
        RefreshToken token = refreshTokenRepository.findByUserId(customer.getId());
        if(token == null) {
            token =	new RefreshToken();
            token.setUser(customer);
        }
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(Date.from(Instant.now().plusSeconds(expireSeconds)));
        refreshTokenRepository.save(token);
        return token.getToken();
    }

    public boolean isRefreshExpired(RefreshToken token) {
        return token.getExpiryDate().before(new Date());
    }

    public RefreshToken getByUser(Integer userId) {
        return refreshTokenRepository.findByUserId(userId);
    }

}