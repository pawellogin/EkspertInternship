package com.example.security.cart;

import org.springframework.data.repository.CrudRepository;

public interface CartRepository extends CrudRepository<CartEntity, Long> {
    CartEntity findByUserIdAndProductId(Long userId, Long productId);

}
