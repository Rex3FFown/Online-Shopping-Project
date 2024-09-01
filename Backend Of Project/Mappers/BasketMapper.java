package com.local.onlineshoppingproject.Mappers;

import com.local.onlineshoppingproject.DTOs.BasketDTO;
import com.local.onlineshoppingproject.DTOs.BasketItemDTO;
import com.local.onlineshoppingproject.Entities.Basket;
import com.local.onlineshoppingproject.Entities.BasketItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BasketMapper {

    BasketMapper INSTANCE = Mappers.getMapper(BasketMapper.class);

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(target = "items", source = "basketItems")
    BasketDTO toBasketDTO(Basket basket);

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    BasketItemDTO toBasketItemDTO(BasketItem basketItem);
}