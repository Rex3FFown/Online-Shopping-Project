package com.local.onlineshoppingproject.Controllers;

import com.local.onlineshoppingproject.Entities.Category;
import com.local.onlineshoppingproject.Services.CategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
@GetMapping
    public List<Category> getAllCategories() {
        return categoryService.showAllCategories();
    }
}
