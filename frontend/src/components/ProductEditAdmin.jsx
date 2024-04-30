import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ProductService from '../services/ProductService';
import '../styles/ProductEditAdmin.css'

function ProductEditAdmin() {
    
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const [showDeleteConfirmationAlert, setShowDeleteConfirmationAlert] = useState(false);

    const fetchData = async () => {
        try{
            const response = await ProductService.getProduct(productId);
            console.log(response.data)
            setProduct(response.data);
        }catch(error){
            console.error("Error fetching product:", error);
        }
    }

    const handleDeleteProduct = (productId) => {
        try{
            ProductService.deleteProduct(productId).then(() =>
                fetchData());

            setShowDeleteConfirmationAlert(true);
            setTimeout(() => {
                navigate('/manageProducts');
                setShowDeleteConfirmationAlert(false);
            },1000)
        }catch(error){
            console.error("Error while deleting product: ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <section className='product-edit-admin'>
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
                    <FontAwesomeIcon icon={faTimes} onClick={() => handleDeleteProduct(productId)} to="/manageProducts" className="product-edit-admin-delete" />
                </div>
            )}
            {showDeleteConfirmationAlert && (
                <div className="alert alert-success product-edit-admin">Product deleted from database!</div>
            )}
        </div>
    </div>
</section>
  )
}

export default ProductEditAdmin