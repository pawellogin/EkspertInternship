package com.example.security.product;

import com.example.security.product.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductEntity,Long> {

    Optional<ProductEntity> findByName(String name);
}
