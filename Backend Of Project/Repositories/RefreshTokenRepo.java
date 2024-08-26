package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepo extends JpaRepository<RefreshToken, Long> {

    RefreshToken findByUserId(Integer userId);
}
