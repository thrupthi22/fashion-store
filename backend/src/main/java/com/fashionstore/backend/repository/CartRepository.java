package com.fashionstore.backend.repository;

import com.fashionstore.backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Integer> {

    // Finds all items in the cart for a specific user
    List<CartItem> findByUserId(int userId);

    // Checks if a specific user already has a specific product in their cart
    CartItem findByUserIdAndProductId(int userId, int productId);

}