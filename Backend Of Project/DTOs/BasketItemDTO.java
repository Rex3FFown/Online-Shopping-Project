package com.local.onlineshoppingproject.DTOs;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BasketItemDTO {
    private Integer id;
    private Integer productId;
    private String productName;
    private Integer quantity;
    private BigDecimal price;
}