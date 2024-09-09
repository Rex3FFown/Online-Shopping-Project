package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface CustomerRepo extends JpaRepository<Customer,Integer> {
    List<Customer> findAllByName(String name);

       Optional<Customer> findByEmail(String email);

    boolean existsByEmail(String email);




}
