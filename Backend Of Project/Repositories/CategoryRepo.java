package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Integer> {
}
