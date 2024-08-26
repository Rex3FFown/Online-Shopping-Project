package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.Entities.Category;
import com.local.onlineshoppingproject.Entities.Product;
import com.local.onlineshoppingproject.Repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepo productRepo;

    @Autowired
    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public List<Product> showAllProdcuts() {
        return productRepo.findAll();
    }

    public List<Product> findByCategoryId(int categoryId) {
        return productRepo.findByCategoryId(categoryId);
    }

    public List<Product> findAll() {
        return productRepo.findAll();
    }
}
