package com.local.onlineshoppingproject.Entities;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "ma_order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private BigDecimal price;

    private Integer count;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;


}