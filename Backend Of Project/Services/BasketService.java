package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.Entities.Basket;
import com.local.onlineshoppingproject.Entities.BasketItem;
import com.local.onlineshoppingproject.Entities.Product;
import com.local.onlineshoppingproject.Repositories.BasketItemRepo;
import com.local.onlineshoppingproject.Repositories.BasketRepo;
import com.local.onlineshoppingproject.Repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BasketService {

    @Autowired
    private BasketRepo basketRepository;
    @Autowired
    private BasketItemRepo basketItemRepository;
    @Autowired
    private ProductRepo productRepository;


    public Basket findBasketByCustomerId(Integer customerId) {
        return basketRepository.findBasketByCustomerId(customerId);
    }



    public BasketItem addItemToBasket(Integer basketId, BasketItem basketItem) {
        Basket basket = basketRepository.findById(basketId)
                .orElseThrow(() -> new RuntimeException("Basket not found"));

        basketItem.setBasket(basket);


        Optional<Product> product = productRepository.findById(basketItem.getProduct().getId());
        if (product.isPresent()) {
            basketItem.setProduct(product.get());
            basketItem.setPrice(product.get().getPrice().multiply(new java.math.BigDecimal(basketItem.getQuantity())));
            return basketItemRepository.save(basketItem);
        } else {
            throw new RuntimeException("Product not found");
        }
    }


    public void removeItemFromBasket(Integer itemId) {
        Optional<Basket> basketOptional = basketRepository.findByBasketItemsId(itemId);
        if (basketOptional.isPresent()) {
            Basket basket = basketOptional.get();
            basket.getBasketItems().removeIf(item -> item.getId().equals(itemId));
            basketRepository.save(basket);
        } else {
            throw new RuntimeException("Item not found in basket");
        }
    }
}