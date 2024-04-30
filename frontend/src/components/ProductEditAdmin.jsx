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
    const [isProductAdded, setIsProductAdded] = useState(false);
    const [errorMassage, setErrorMassage] = useState("");

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productStock, setProductStock] = useState("");
    const [productImage, setProductImage] = useState(null);

    const fetchData = async () => {
        try{
            const response = await ProductService.getProduct(productId);
            console.log(response.data)
            setProduct(response.data);
        }catch(error){
            if(error == 409){
                setErrorMassage("Product already in database");
            }
            console.error("Error fetching product:", error);
        }
    }

    useEffect(() =>{
        if(product){
            setProductName(product.name);
            setProductPrice(product.price);
            setProductStock(product.stock);
            setProductImage(null);
        }
    }, [product])

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

    const handleSubmit = async (e, productId, productName, productPrice, productStock, productImage) => {
        e.preventDefault();
        try{
            await ProductService.patchProduct(
                productId,
                productName,
                productPrice,
                productStock,
                productImage
                )
                setIsProductAdded(true);
                setTimeout(() => {
                    setIsProductAdded(false);
                },1000)
        }catch(error){
            if(error.response?.status === 409) {
                setErrorMassage("Product already in the database!")
                setTimeout(() => {
                    setErrorMassage("");
                },1500)
            }
            console.error("Error while submit edited product: ", error);
        }
    } 

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <section className='product-edit-admin'>
    <h2>Products Page</h2>

    
        <div className='container'>
        <form onSubmit={(e) => handleSubmit(e,productId, productName, productPrice, productStock, productImage )} className="product-edit-admin-form">
                <div className="card product-edit-admin-form-main">
                    <div className='card-body product-edit-admin-form-inputs'>
                        Name: <input type="text"   id="name" className="card-title"  value={productName}  onChange={(e) => setProductName(e.target.value)}/>
                        Price: <input type="number" id="price" className="card-text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/>
                        Stock: <input type="number" id="stock" className="card-text" value={productStock} onChange={(e) => setProductStock(e.target.value)}/>
                        {/* <input type="image"  id="image" className="card-image">{product.image}</input> */}
                    </div>
                    <div className="product-edit-admin-form-buttons">
                        {isProductAdded ? 
                        (
                            <button className="btn btn-secondary product-edit-admin-product-saved">Saved!</button>
                        ):
                        (
                            <button className="btn btn-secondary product-edit-admin-save">Save</button>
                        )}
                        <button 
                            onClick={(e) => handleDeleteProduct(productId)} 
                            to="/manageProducts" 
                            className="btn btn-danger product-edit-admin-delete" 
                            type="submit">
                                Delete Product
                        </button>
                    </div>
                </div>
        </form>
            {showDeleteConfirmationAlert && (
                    <div className="alert alert-success product-edit-admin-alert product-edit-admin-alert-deleted">Product deleted from database!</div>
            )}
            {errorMassage && (
                <div className="alert alert-danger product-edit-admin-alert product-edit-admin-alert-conflict">{errorMassage}</div>
            )}
        </div>

</section>
  )
}

export default ProductEditAdmin