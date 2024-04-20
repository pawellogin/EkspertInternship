package com.example.security.product;

import javax.persistence.Lob;
import java.math.BigDecimal;

public class ProductDto {
    private long id;

    private String name;

    private BigDecimal price;

    private Float stock;

    @Lob
    private byte[] image;

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Float getStock() {
        return stock;
    }

    public byte[] getImage() {
        return image;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setStock(Float stock) {
        this.stock = stock;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}

