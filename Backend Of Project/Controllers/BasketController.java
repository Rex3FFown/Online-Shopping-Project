package com.local.onlineshoppingproject.Controllers;

import com.local.onlineshoppingproject.Entities.Basket;
import com.local.onlineshoppingproject.Entities.BasketItem;
import com.local.onlineshoppingproject.Services.BasketItemService;
import com.local.onlineshoppingproject.Services.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@PreAuthorize("permitAll()")
@RestController
@RequestMapping("/api/baskets")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @Autowired
    private BasketItemService basketItemService;


    @GetMapping("/customer/{customerId}")
    public Basket getBasketByCustomerId(@PathVariable Integer customerId) {
        return basketService.findBasketByCustomerId(customerId);
    }





    @PostMapping("/{basketId}/items")
    public BasketItem addItemToBasket(@PathVariable Integer basketId, @RequestBody BasketItem basketItem) {
        return basketService.addItemToBasket(basketId, basketItem);
    }

    // Sepetten ürün silme
    @DeleteMapping("/{basketId}/items/{itemId}")
    public void removeItemFromBasket(@PathVariable Integer basketId, @PathVariable Integer itemId) {
        basketService.removeItemFromBasket(itemId);
    }
}
