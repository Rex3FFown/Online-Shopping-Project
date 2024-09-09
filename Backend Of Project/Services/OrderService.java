package com.local.onlineshoppingproject.Services;

import com.local.onlineshoppingproject.Entities.*;
import com.local.onlineshoppingproject.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepository;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private BasketRepo basketRepo;
    @Autowired
    private BasketItemRepo basketItemRepo;
    @Autowired
    private OrderItemRepo orderItemRepo;
    @Autowired
    private BasketItemService basketItemService;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }
    public List<Order> getOrdersByCustomerId(Integer customerId) {
        return orderRepository.findByCustomerId(customerId);
    }


    public Order addNewOrder(Integer customerId) {

        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found with id: " + customerId));

        Basket basket = basketRepo.findBasketByCustomerId(customerId);
        Integer basketId = basket.getId();

        Order order = new Order();
        order.setCustomer(customer);
        order.setDate(LocalDateTime.now());


        Order savedOrder = orderRepository.save(order);


        List<BasketItem> basketItems = basketItemRepo.getBasketItemsByBasketId(basketId);


        for (BasketItem basketItem : basketItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(basketItem.getProduct());
            orderItem.setPrice(basketItem.getPrice());
            orderItem.setCount(basketItem.getQuantity());
            basketItemRepo.deleteById(basketItem.getId());
            orderItemRepo.save(orderItem);
        }

        return savedOrder;
    }


    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }


}