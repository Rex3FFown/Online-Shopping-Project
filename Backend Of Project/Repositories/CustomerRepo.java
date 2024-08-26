package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.User;

import java.util.List;
import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer,Integer> {
    List<Customer> findAllByName(String name);

    Optional<Customer> findByEmail(String email);

    @Query("SELECT c.role FROM Customer c WHERE c.id = :id")
    String findRoleById(@Param("id") int id);


}
