package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.Entities.Basket;
import com.local.onlineshoppingproject.Entities.BasketItem;
import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Entities.Product;
import com.local.onlineshoppingproject.Exceptions.EmailAlreadyExistsException;
import com.local.onlineshoppingproject.Repositories.BasketItemRepo;
import com.local.onlineshoppingproject.Repositories.BasketRepo;
import com.local.onlineshoppingproject.Repositories.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class BasketItemService {

    private final BasketItemRepo basketItemRepo;
    private final ProductRepo productRepo;
    private final BasketRepo basketRepo;

    public List<BasketItem> getItemsByBasketId(int basketId) {
        return basketItemRepo.getItemsByBasketId(basketId);
    }

    public BasketItem getById(int id) {
        return basketItemRepo.getById(id);
    }


    public void removeItemFromBasket(Integer basketItemId) {
        basketItemRepo.deleteById(basketItemId);

    }

    public BasketItem addItemToBasket(BasketItem basketItem) {
        return basketItemRepo.save(basketItem);
    }

    public BasketItem updateQuantity(Integer itemId, int newQuantity) {
        BasketItem basketItem = basketItemRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("BasketItem not found"));
        if (newQuantity <= 0) {
            basketItemRepo.delete(basketItem);
            return null;
        }
        basketItem.setQuantity(newQuantity);
        return basketItemRepo.save(basketItem);
    }

    public BasketItem addNewItemToBasket(Integer productId, Integer basketId) {

        Basket basket = basketRepo.findById(basketId)
                .orElseThrow(() -> new IllegalArgumentException("Basket not found with id: " + basketId));
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));


        BasketItem basketItem = new BasketItem();
        basketItem.setBasket(basket);
        basketItem.setProduct(product);
        basketItem.setQuantity(1);
        basketItem.setPrice(product.getPrice());


        return basketItemRepo.save(basketItem);
    }


}
