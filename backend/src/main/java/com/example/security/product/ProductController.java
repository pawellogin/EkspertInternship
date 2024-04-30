package com.example.security.product;


import com.example.security.product.impl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/")
public class ProductController {

    private ProductMapper productMapper;

    private ProductServiceImpl productService;

    @Autowired
    public ProductController(ProductMapper productMapper, ProductServiceImpl productService) {
        this.productMapper = productMapper;
        this.productService = productService;
    }

    @PostMapping(path = "/products")
    @PreAuthorize("hasAuthority('product:write')")
    public ResponseEntity<ProductDto> createProduct(
            @RequestParam("image") MultipartFile image,
            @RequestParam("name") String name,
            @RequestParam("price") BigDecimal price,
            @RequestParam("stock") Float stock) {
        // Check if a product with the same name already exists
        if (productService.findOneByName(name).isPresent()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        // Check if an image file is provided
        if (image == null || image.isEmpty()) {
//            return new ResponseEntity<>("Image file is required", HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            // Convert the image file to a byte array
            byte[] imageData = image.getBytes();

            // Create a new ProductEntity and set its properties
            ProductEntity productEntity = new ProductEntity();
            productEntity.setName(name);
            productEntity.setPrice(price);
            productEntity.setStock(stock);
            productEntity.setImage(imageData);

            // Save the product entity
            ProductEntity savedProductEntity = productService.save(productEntity);

            // Map the saved product entity to a DTO and return it
            ProductDto savedProductDto = productMapper.mapFromEntityToDto(savedProductEntity);
            return new ResponseEntity<>(savedProductDto, HttpStatus.CREATED);
        } catch (IOException e) {
//            return new ResponseEntity<>("Failed to process image file", HttpStatus.INTERNAL_SERVER_ERROR);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path ="/products")
    @PreAuthorize("hasAuthority('product:read')")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public Page<ProductDto> getProducts(Pageable pageable){
        Page<ProductEntity> productPage = productService.findAll(pageable);
        return productPage.map(productMapper::mapFromEntityToDto);
    }

    @GetMapping(path ="/products/{id}")
    @PreAuthorize("hasAuthority('product:read')")
    public ResponseEntity<ProductDto> getProduct(@PathVariable("id") Long id){
        Optional<ProductEntity> foundProduct = productService.findOne(id);

        if(foundProduct.isPresent()){
            ProductEntity productEntity = foundProduct.get();
            ProductDto productDto = productMapper.mapFromEntityToDto(productEntity);
            productDto.setImage(productEntity.getImage()); // Set the image data in the DTO
            return new ResponseEntity<>(productDto, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(path = "/products/{id}")
    @PreAuthorize("hasAuthority('product:write')")
    public ResponseEntity<ProductDto> updatePartialProduct(
            @PathVariable("id") Long id,
            @RequestBody ProductDto ProductDto){
        if(!productService.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ProductDto.setId(id);
        ProductEntity ProductEntity = productMapper.mapToEntityFromDto(ProductDto);
        ProductEntity savedProductEntity = productService.save(ProductEntity);

        return new ResponseEntity<>(
                productMapper.mapFromEntityToDto(savedProductEntity),
                HttpStatus.OK
        );
    }

    @PatchMapping(path = "/products/{id}")
    @PreAuthorize("hasAuthority('product:write')")
    public ResponseEntity<ProductDto> updateFullProduct(
            @PathVariable("id") Long id,
            @RequestBody ProductDto productDto){
        Optional<ProductEntity> existingProductEntity = productService.findOne(id);
        if(existingProductEntity.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Optional<ProductEntity> entityWithTheSameName = productService.findOneByName(productDto.getName());
        if(entityWithTheSameName.isPresent()) {
            if(entityWithTheSameName.get().getId() != productDto.getId()){
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }

        if (productDto.getName() != null ) {
            existingProductEntity.get().setName(productDto.getName());
        }

        if (productDto.getPrice() != null) {
            existingProductEntity.get().setPrice(productDto.getPrice());
        }

        if (productDto.getStock() != null) {
            existingProductEntity.get().setStock(productDto.getStock());
        }

        if (productDto.getImage() != null) {
            existingProductEntity.get().setImage(productDto.getImage());
        }

        ProductEntity savedProductEntity = productService.save(existingProductEntity.get());

        return new ResponseEntity<>(
                productMapper.mapFromEntityToDto(savedProductEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/products/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity deleteProduct(@PathVariable("id") Long id){
        productService.deleteProduct(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
