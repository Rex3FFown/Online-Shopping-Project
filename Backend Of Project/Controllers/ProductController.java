package com.local.onlineshoppingproject.Controllers;

import com.local.onlineshoppingproject.Entities.Category;
import com.local.onlineshoppingproject.Entities.Product;
import com.local.onlineshoppingproject.Services.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private ProductService productService;


    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public List<Product> getProductsByCategoryId(@PathVariable int id) {

            return productService.findByCategoryId(id);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.findAll();
    }
    }

