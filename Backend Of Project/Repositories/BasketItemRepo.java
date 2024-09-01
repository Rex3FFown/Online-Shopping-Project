package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.BasketItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketItemRepo extends JpaRepository<BasketItem, Integer> {
}
