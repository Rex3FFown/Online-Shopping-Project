package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.Entities.Category;
import com.local.onlineshoppingproject.Repositories.CategoryRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    CategoryRepo categoryRepo;

    public CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    public List<Category> showAllCategories(){
        return categoryRepo.findAll();
    }
}
