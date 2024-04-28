import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import ProductService from '../services/ProductService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import '../styles/ProductListDetails.css'

function ProductListDetails() {
    
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [stockAmount, setStockAmount] = useState(0.0);

    const fetchData = async () => {
        try{
            const response = await ProductService.getProduct(productId);
            console.log(response.data)
            setProduct(response.data);
        }catch(error){
            console.error("Error fetching product:", error);
        }
    }

    const decreaseStock = () => {
        if(stockAmount > 0){
            setStockAmount(stockAmount -1);
        }
    }

    const increaseStock = (maxStock) => {
        if(stockAmount < maxStock){
            setStockAmount(stockAmount + 1);
        }
    }

    const handleAddToCart = () => {
        console.log("TODO add endpoint");
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
                    <div className='product-list-details-stock-buttons'>
                        <button className='btn btn-secondary' onClick={decreaseStock}><FontAwesomeIcon icon={faMinus} /></button>
                        <input
                            type="number" 
                            className='product-list-details-stock-amount' 
                            value={stockAmount}
                            onChange={(e) => setStockAmount(parseInt(e.target.value))}
                            inputMode="numeric"
                        />
                        <button className='btn btn-secondary' onClick={() => increaseStock(product.stock)}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                    <button className='btn btn-secondary product-list-details-product-add-button' onClick={handleAddToCart}>Add to chart</button> 
                </div>
            )}
        </div>
    </div>
</section>
  )
}

export default ProductListDetails