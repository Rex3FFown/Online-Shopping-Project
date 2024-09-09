package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.Basket;
import com.local.onlineshoppingproject.Entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BasketRepo extends JpaRepository<Basket, Integer> {
    Optional<Basket> findByCustomerId(Integer customerId);
    Optional<Basket> findByBasketItemsId(Integer customerId);

    Basket findBasketByCustomerId(Integer customerId);



}
