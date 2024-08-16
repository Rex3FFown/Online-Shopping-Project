package com.local.onlineshoppingproject.Controllers;


import com.local.onlineshoppingproject.Services.OrderService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class OrderController {
    private OrderService orderService;
}
