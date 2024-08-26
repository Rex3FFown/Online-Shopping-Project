package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.Entities.Order;
import com.local.onlineshoppingproject.Repositories.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }
    public List<Order> getOrdersByCustomerId(Integer customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }

    // Ek işlevler ekleyebilirsiniz
}