package com.local.onlineshoppingproject.Controllers;


import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Exceptions.EmailAlreadyExistsException;
import com.local.onlineshoppingproject.Services.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllUsers();
    }

    @GetMapping("/{customerId}")
    public Customer getCustomerById(@PathVariable int customerId) {
        return customerService.getCustomerById(customerId);
    }

    @GetMapping("/by-name/{customerName}")
    public List<Customer> getCustomerByName(@PathVariable String customerName) {
        return customerService.getCustomerByName(customerName);
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer) {
        return customerService.addNewUser(customer);
    }
    @PostMapping("/u")
    public List<Customer> addManyCustomer(@RequestBody List<Customer> customer) {
        return customerService.addThoseCustomer(customer);
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{customerId}")
    public Customer updateCustomer(@PathVariable int customerId,@RequestBody Customer customer) {
        return customerService.updateThatCustomer(customerId,customer);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{customerId}")
    public void deleteCustomer(@PathVariable int customerId) {
        customerService.deleteThatCustomer(customerId);
    }
    @PreAuthorize("permitAll()")
    @PostMapping("/register")

    public Object registerCustomer(@RequestBody Customer customer) {
        try {
            Customer newCustomer = customerService.addNewUser(customer);
            return newCustomer; // Return the newly created customer
        } catch (EmailAlreadyExistsException e) {
            return e.getMessage(); // Return the error message
        }
    }
}
