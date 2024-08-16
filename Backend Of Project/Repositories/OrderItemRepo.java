package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepo extends JpaRepository<OrderItem, Integer> {
}
