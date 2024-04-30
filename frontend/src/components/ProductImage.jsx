import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';

const ProductImage = ({ productId, className }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const response = await ProductService.getProduct(productId);
        const imageData = response.data.image;
        setImageSrc(`data:image/jpeg;base64,${imageData}`);
      } catch (error) {
        console.error('Error fetching product image:', error);
      }
    };

    fetchProductImage();
  }, [productId]);

  return (
    <img src={imageSrc} alt="Product" className={className} />
  );
};

export default ProductImage;

