package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.DTOs.BasketDTO;
import com.local.onlineshoppingproject.DTOs.BasketItemDTO;
import com.local.onlineshoppingproject.Entities.Basket;
import com.local.onlineshoppingproject.Entities.BasketItem;
import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Entities.Product;
import com.local.onlineshoppingproject.Mappers.BasketMapper;
import com.local.onlineshoppingproject.Repositories.BasketItemRepo;
import com.local.onlineshoppingproject.Repositories.BasketRepo;


import com.local.onlineshoppingproject.Repositories.CustomerRepo;
import com.local.onlineshoppingproject.Repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BasketService {



    @Autowired
    private BasketRepo basketRepository;
    private BasketItemRepo basketItemRepository;
    private ProductRepo productRepository;

    private final BasketMapper basketMapper = BasketMapper.INSTANCE;
    public BasketDTO convertToDTO(Basket basket) {
        return basketMapper.toBasketDTO(basket);
    }

    private BasketItemDTO convertToBasketItemDTO(BasketItem item) {
        BasketItemDTO itemDTO = new BasketItemDTO();
        itemDTO.setId(item.getId());
        itemDTO.setProductId(item.getProduct().getId());
        itemDTO.setProductName(item.getProduct().getName());
        itemDTO.setQuantity(item.getQuantity());
        itemDTO.setPrice(item.getPrice());
        return itemDTO;
    }
    public Optional<Basket> getBasketByCustomerId(Integer customerId) {
        return basketRepository.findByCustomerId(customerId);
    }

    public Basket createBasket(Basket basket) {
        return basketRepository.save(basket);
    }

    public Optional<Basket> getBasketById(Integer id) {
        return basketRepository.findById(id);
    }



    public Basket updateBasket(Basket basket) {
        return basketRepository.save(basket);
    }

    public void deleteBasket(Integer id) {
        basketRepository.deleteById(id);
    }

    public BasketItem addItemToBasket(Integer basketId, BasketItem basketItem) {
        Basket basket = basketRepository.findById(basketId)
                .orElseThrow(() -> new RuntimeException("Basket not found"));


        basketItem.setBasket(basket);
        return basketItemRepository.save(basketItem);
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