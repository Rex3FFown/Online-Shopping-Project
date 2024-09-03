package com.local.onlineshoppingproject.Controllers;

import com.local.onlineshoppingproject.Entities.Category;
import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Entities.Product;
import com.local.onlineshoppingproject.Services.ProductService;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addNewProduct();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{productId}")
    public Product updateProduct(@PathVariable int productId,@RequestBody Product product) {
        return productService.updateThatProduct(productId, product);
    }
 @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{product}")
    public void deleteProduct(@RequestBody Product product) {
        productService.deleteThatProduct();
    }
    }

