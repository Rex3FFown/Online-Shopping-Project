package com.local.onlineshoppingproject.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class BasketDTO {
    private Integer id;
    private Integer customerId;
    private List<BasketItemDTO> items;


}