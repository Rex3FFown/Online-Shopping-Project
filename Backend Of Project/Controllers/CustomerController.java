package com.local.onlineshoppingproject.Controllers;


import com.local.onlineshoppingproject.Entities.Customer;
import com.local.onlineshoppingproject.Services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }
    @PreAuthorize("hasRole('ADMIN')")
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

    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer) {
        return customerService.addNewUser(customer);
    }
    @PostMapping("/u")
    public List<Customer> addManyCustomer(@RequestBody List<Customer> customer) {
        return customerService.addThoseCustomer(customer);
    }

    @PutMapping("/{customerId}")
    public Customer updateCustomer(@PathVariable int customerId,@RequestBody Customer customer) {
        return customerService.updateThatCustomer(customerId,customer);
    }
    @DeleteMapping
    public void deleteCustomer(@PathVariable int customerId) {
        customerService.deleteThatCustomer(customerId);
    }
}
