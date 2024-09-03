package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Exceptions.EmailAlreadyExistsException;
import com.local.onlineshoppingproject.Repositories.CustomerRepo;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {


    private final CustomerRepo customerRepo;

    public CustomerService(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    public List<Customer> getAllUsers() {
        return customerRepo.findAll();
    }

    public Customer addNewUser(Customer customer) {
        if (customerRepo.existsByEmail(customer.getEmail())) {
            throw new EmailAlreadyExistsException("Bu emaile sahip bir kullanıcı mevcut.");
        }

        return customerRepo.save(customer);
    }

    public Customer getCustomerById(int customerId) {
        return customerRepo.findById(customerId).orElse(null);
    }

    public Customer updateThatCustomer(int customerId, Customer newCustomer) {
        Optional<Customer> customer = customerRepo.findById(customerId);
        if (customer.isPresent()) {

            Customer foundCustomer = customer.get();
            foundCustomer.setName(newCustomer.getName());
            foundCustomer.setSurname(newCustomer.getSurname());
            foundCustomer.setEmail(newCustomer.getEmail());
            foundCustomer.setPassword(newCustomer.getPassword());
            foundCustomer.setAddress(newCustomer.getAddress());
            return customerRepo.save(foundCustomer);
        } else {
            // Eğer kullanıcı yoksa, null döndürüyoruz.
            return null;
        }
    }

    public void deleteThatCustomer(int customerId) {
        customerRepo.deleteById(customerId);
    }

    public List<Customer> addThoseCustomer(List<Customer> customer) {
        return customerRepo.saveAll(customer);
    }

    public List<Customer> getCustomerByName(String customerName) {
        return customerRepo.findAllByName(customerName);
    }

    public Customer getCustomerByMail(String email) {
        Optional<Customer> customer = customerRepo.findByEmail(email);
        return customer.orElse(null);
    }


}

