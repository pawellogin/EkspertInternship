package com.example.security.cart;

import javax.persistence.*;

@Entity
@Table(name = "cart")
public class CartEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cart_id_seq")
    private Long id;

    private Long userId;

    private Long productId;

    private Long productAmount;

    public CartEntity(Long userId, Long productId, Long productAmount) {
        this.userId = userId;
        this.productId = productId;
        this.productAmount = productAmount;
    }

    public CartEntity() {

    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getProductAmount() {
        return productAmount;
    }

    public void setProductAmount(Long productAmount) {
        this.productAmount = productAmount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
