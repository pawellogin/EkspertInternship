package com.example.security.cart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    CartEntity findByUserIdAndProductId(Long userId, Long productId);

    List<CartEntity> findAllByUserId(Long userId);

    Optional<CartEntity> findByIdAndUserId(Long id, Long userId);
}
