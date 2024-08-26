package com.local.onlineshoppingproject.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

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

    private String address;

    private String email;

    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        USER, ADMIN
    }

    @OneToMany(mappedBy = "customer")
    private Set<Order> orders;


}