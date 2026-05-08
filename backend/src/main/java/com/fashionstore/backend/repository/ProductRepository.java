package com.fashionstore.backend.repository;

import com.fashionstore.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // NEW: Find products by their exact category name
    List<Product> findByCategory(String category);
}
