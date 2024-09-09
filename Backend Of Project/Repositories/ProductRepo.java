package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.Category;
import com.local.onlineshoppingproject.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    List<Product> findByCategoryId(int category);
    Product getProductById(int id);

    List<Product> getProductsById(Integer productId);
}
