package com.example.security.product;

import com.example.security.product.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface ProductService {
    ProductEntity save(ProductEntity productEntity);

    Page<ProductEntity> findAll(Pageable pageable);

    Optional<ProductEntity> findOne(Long id);

    boolean isExists(Long id);

    void deleteUser(Long id);
}
