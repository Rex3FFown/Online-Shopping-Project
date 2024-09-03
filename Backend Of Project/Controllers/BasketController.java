package com.local.onlineshoppingproject.Controllers;
import com.local.onlineshoppingproject.DTOs.BasketDTO;
import com.local.onlineshoppingproject.DTOs.BasketItemDTO;
import com.local.onlineshoppingproject.Entities.Basket;
import com.local.onlineshoppingproject.Entities.BasketItem;
import com.local.onlineshoppingproject.Entities.Product;
import com.local.onlineshoppingproject.Services.BasketService;
import com.local.onlineshoppingproject.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/baskets")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @Autowired
    private ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Basket createBasket(@RequestBody Basket basket) {
        return basketService.createBasket(basket);
    }

    @GetMapping("/{id}")
    public Basket getBasketById(@PathVariable Integer id) {
        return basketService.getBasketById(id).orElse(null);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/customer/{customerId}")
    public BasketDTO getBasketByCustomerId(@PathVariable Integer customerId) {
        Basket basket = basketService.getBasketByCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Basket not found for customer ID: " + customerId));

        return basketService.convertToDTO(basket);
    }

    @PutMapping("/{id}")
    public Basket updateBasket(@PathVariable Integer id, @RequestBody Basket basket) {
        basket.setId(id);
        return basketService.updateBasket(basket);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBasket(@PathVariable Integer id) {
        basketService.deleteBasket(id);
    }

    @PostMapping("/{basketId}/items")
    public BasketItem addItemToBasket(@PathVariable Integer basketId, @RequestBody BasketItemDTO basketItemDTO) {
        Basket basket = basketService.getBasketById(basketId)
                .orElseThrow(() -> new RuntimeException("Basket not found"));
        Product product = productService.getProductById(basketItemDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        BasketItem basketItem = new BasketItem();
        basketItem.setBasket(basket);
        basketItem.setProduct(product);
        basketItem.setQuantity(basketItemDTO.getQuantity());
        return basketService.addItemToBasket(basketId, basketItem);
    }

    @DeleteMapping("/items/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeItemFromBasket(@PathVariable Integer itemId) {
        basketService.removeItemFromBasket(itemId);
    }
}
