package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Integer> {
}
