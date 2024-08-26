package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OrderItemRepo extends JpaRepository<OrderItem, Integer> {

}
