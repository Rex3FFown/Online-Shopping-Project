package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer,Integer> {
}
