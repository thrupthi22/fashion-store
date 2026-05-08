package com.fashionstore.backend.controller;

import com.fashionstore.backend.model.CartItem;
import com.fashionstore.backend.model.Product;
import com.fashionstore.backend.repository.CartRepository;
import com.fashionstore.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable int userId) {
        return cartRepository.findByUserId(userId);
    }

    // UPDATED: Now it checks if the item is already there!
    @PostMapping("/add")
    public CartItem addToCart(@RequestBody CartRequest request) {
        Product product = productRepository.findById(request.getProductId()).orElseThrow();

        // Check if this user already has this product in their cart
        CartItem existingItem = cartRepository.findByUserIdAndProductId(request.getUserId(), request.getProductId());

        if (existingItem != null) {
            // If it exists, just increase the quantity!
            existingItem.setQuantity(existingItem.getQuantity() + 1);
            return cartRepository.save(existingItem);
        }

        // If it doesn't exist, create a new row
        CartItem cartItem = new CartItem();
        cartItem.setUserId(request.getUserId());
        cartItem.setProduct(product);
        cartItem.setQuantity(1); // Default to 1

        return cartRepository.save(cartItem);
    }

    // NEW: Endpoint to handle the + and - buttons
    @PutMapping("/update/{cartItemId}")
    public CartItem updateQuantity(@PathVariable int cartItemId, @RequestParam int quantity) {
        CartItem item = cartRepository.findById(cartItemId).orElseThrow();
        item.setQuantity(quantity);
        return cartRepository.save(item);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public void removeFromCart(@PathVariable int cartItemId) {
        cartRepository.deleteById(cartItemId);
    }
}

class CartRequest {
    private int userId;
    private int productId;
    private int quantity;

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }
    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}
