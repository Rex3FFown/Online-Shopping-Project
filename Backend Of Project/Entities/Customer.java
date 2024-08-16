package com.local.onlineshoppingproject.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name = "ma_customers")
@Data
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String surname;

    private String adress;

    private String eMail;

    private String password;

    @OneToMany(mappedBy = "customer")
    private Set<Order> orders;


}