package com.local.onlineshoppingproject.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "ma_products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer seq;

    private String name;

    private BigDecimal price;

    private Integer stock;

@Column(length = 10000)
    private String description;
    @Column(length = 1000)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}