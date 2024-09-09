package com.local.onlineshoppingproject.Repositories;

import com.local.onlineshoppingproject.Entities.BasketItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BasketItemRepo extends JpaRepository<BasketItem, Integer> {

    List<BasketItem> getItemsByBasketId(int basketId);
    void deleteItemByBasketIdAndProductId(int basketId, int itemId);
    Integer findBasketItemIdByBasketIdAndProductId(Integer basketId, Integer productId);
    List<BasketItem> getBasketItemsByBasketId(int basketId);

   // void deleteBasketItems(int basketId);
}
