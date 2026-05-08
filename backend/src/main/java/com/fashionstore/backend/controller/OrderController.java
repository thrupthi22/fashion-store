package com.fashionstore.backend.controller;

import com.fashionstore.backend.model.CartItem;
import com.fashionstore.backend.model.Order;
import com.fashionstore.backend.repository.CartRepository;
import com.fashionstore.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    // 1. The Checkout Endpoint!
    @PostMapping("/checkout/{userId}")
    public Order placeOrder(@PathVariable int userId) {
        // Step A: Get everything in the user's cart
        List<CartItem> cartItems = cartRepository.findByUserId(userId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty!");
        }

        // Step B: Calculate the total price
        BigDecimal total = BigDecimal.ZERO;
        for (CartItem item : cartItems) {
            BigDecimal itemTotal = item.getProduct().getPrice().multiply(new BigDecimal(item.getQuantity()));
            total = total.add(itemTotal);
        }

        // Step C: Create and save the Order
        Order newOrder = new Order();
        newOrder.setUserId(userId);
        newOrder.setTotalPrice(total);
        Order savedOrder = orderRepository.save(newOrder);

        // Step D: Empty the cart!
        cartRepository.deleteAll(cartItems);

        return savedOrder;
    }

    // 2. Get a user's order history
    @GetMapping("/{userId}")
    public List<Order> getUserOrders(@PathVariable int userId) {
        return orderRepository.findByUserIdOrderByOrderDateDesc(userId);
    }
}
