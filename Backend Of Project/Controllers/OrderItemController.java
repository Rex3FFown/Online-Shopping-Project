package com.local.onlineshoppingproject.Controllers;

import com.local.onlineshoppingproject.Services.OrderItemService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class OrderItemController {
    private OrderItemService orderItemService;
}
