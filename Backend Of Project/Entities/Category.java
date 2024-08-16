package com.local.onlineshoppingproject.Entities;
import jakarta.persistence.*;
import lombok.Data;


import java.util.Set;

@Entity
@Table(name = "ma_categories")
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer seq;

    private String name;

    @OneToMany(mappedBy = "category")
    private Set<Product> products;

}