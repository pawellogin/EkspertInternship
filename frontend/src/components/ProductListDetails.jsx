import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import ProductService from '../services/ProductService';
import '../styles/ProductListDetails.css'

function ProductListDetails() {
    
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const fetchData = async () => {
        try{
            const response = await ProductService.getProduct(productId);
            console.log(response.data)
            setProduct(response.data);
        }catch(error){
            console.error("Error fetching product:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <section className='product-list-details'>
    <h2>Products Page</h2>

    <div className='container'>
        <div className='card-columns'>
            {product && (
                <div className="card">
                    <div className='card-body'>
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Pice: {product.price}$</p>
                        <p className="card-text">Stock: {product.stock}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
</section>
  )
}

export default ProductListDetails