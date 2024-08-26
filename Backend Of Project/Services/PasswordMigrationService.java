package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Repositories.CustomerRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordMigrationService {

    private final CustomerRepo customerRepo;
    private final PasswordEncoder passwordEncoder;


    public PasswordMigrationService(CustomerRepo customerRepo, PasswordEncoder passwordEncoder) {
        this.customerRepo = customerRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void migratePasswords() {
        List<Customer> customers = customerRepo.findAll();
        for (Customer customer : customers) {
            if (!customer.getPassword().startsWith("$2a$")) { // Example check
                customer.setPassword(passwordEncoder.encode(customer.getPassword()));
                customerRepo.save(customer);
            }
        }
    }
}