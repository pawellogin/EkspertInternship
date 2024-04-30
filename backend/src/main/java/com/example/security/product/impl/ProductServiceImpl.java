package com.example.security.product.impl;

import com.example.security.product.ProductEntity;
import com.example.security.product.ProductRepository;
import com.example.security.product.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductEntity save(ProductEntity productEntity) {
        return productRepository.save(productEntity);
    }

    @Override
    public Page<ProductEntity> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Optional<ProductEntity> findOne(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return productRepository.existsById(id);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Optional<ProductEntity> findOneByName(String name) {
        return productRepository.findByName(name);
    }
}



