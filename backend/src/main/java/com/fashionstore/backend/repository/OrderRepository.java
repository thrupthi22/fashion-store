package com.fashionstore.backend.repository;

import com.fashionstore.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    // Find all past orders for a specific user
    List<Order> findByUserIdOrderByOrderDateDesc(int userId);
}