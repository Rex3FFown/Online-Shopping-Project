package com.local.onlineshoppingproject.Controllers;


import com.local.onlineshoppingproject.Entities.BasketItem;
import com.local.onlineshoppingproject.Services.BasketItemService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@PreAuthorize("permitAll()")
@RestController
@RequestMapping("/api/basketitems")
@RequiredArgsConstructor
public class BasketItemController {


    private final BasketItemService basketItemService;


    @GetMapping("/{id}")
    public List<BasketItem> getBasketItems(@PathVariable Integer id) {
        return basketItemService.getItemsByBasketId(id);
    }

    @GetMapping("/basket/{id}")
    public BasketItem getBasketItem(@PathVariable Integer id) {
        return basketItemService.getById(id);
    }

    @PutMapping("/{itemId}")
    public BasketItem updateItemQuantity(@PathVariable Integer itemId, @RequestBody Map<String, Integer> request) {
        int newQuantity = request.getOrDefault("quantity", 0);
        BasketItem updatedItem = basketItemService.updateQuantity(itemId, newQuantity);
        if (updatedItem == null) {

            return null;
        }
        return updatedItem;
    }

    @PostMapping("/addItem/{productId}/{basketId}")
    public BasketItem addItem(@PathVariable Integer productId, @PathVariable Integer basketId) {
        return basketItemService.addNewItemToBasket(productId, basketId);
    }

    @DeleteMapping("/{basketItemId}")
    public void deleteBasketItem(@PathVariable Integer basketItemId) {
        basketItemService.removeItemFromBasket(basketItemId);

    }



}
