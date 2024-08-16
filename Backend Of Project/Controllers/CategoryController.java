package com.local.onlineshoppingproject.Controllers;

import com.local.onlineshoppingproject.Services.CategoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private CategoryService categoryService;
}
