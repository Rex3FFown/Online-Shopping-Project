package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepo extends JpaRepository<Order, Integer> {
    List<Order> findByCustomerId(Integer customerId);

}
