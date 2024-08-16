package com.local.onlineshoppingproject.Controllers;

import com.local.onlineshoppingproject.Services.ProductService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class ProductController {
    private ProductService productService;
}
