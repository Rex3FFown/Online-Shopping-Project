package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.Entities.Category;
import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Entities.Product;
import com.local.onlineshoppingproject.Repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Product addNewProduct() {
        return productRepo.save(new Product());
    }

    public Product updateThatProduct(int customerId, Product newProduct) {
        Optional<Product> product = productRepo.findById(customerId);
        if (product.isPresent()) {
            // Eğer kullanıcı varsa, bilgilerini güncelliyoruz.
            Product foundProduct = product.get();
            foundProduct.setName(newProduct.getName());
            foundProduct.setDescription(newProduct.getDescription());
            foundProduct.setPrice(newProduct.getPrice());
            foundProduct.setImageUrl(newProduct.getImageUrl());
            return productRepo.save(foundProduct);
        } else {

            return null;
        }
    }


    public Product getProduct(Integer id) {
        return productRepo.getProductById(id);
    }
    public void deleteThatProduct() {
        productRepo.deleteById(productRepo.findAll().get(0).getId());
    }



}
