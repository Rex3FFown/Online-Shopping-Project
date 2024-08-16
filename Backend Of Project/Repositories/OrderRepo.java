package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Integer> {
}
