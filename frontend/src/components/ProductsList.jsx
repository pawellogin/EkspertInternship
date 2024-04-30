import React, { useEffect, useState } from 'react'
import ProductService from "../services/ProductService"
import ProductImage from './ProductImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CartService from '../services/CartService';
import '../styles/ProductList.css'

function ProductList() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [showZeroStock, setShowZeroStock] = useState(false);
    const [showAddedToCart, setShowAddedToCart] = useState(false);
    const [addedProductId, setAddedProductId] = useState(null);


    const fetchDataByPage = async () => {
        try{
            const response = await ProductService.getProductsPage(currentPage - 1, productsPerPage);
            setProducts(response.data.content);   
            // console.log("fetch page data");            
        } catch (error) {
          console.error('Error fetching products:', error);
        }
    };

    const fetchDataAll = async () => {
        try{
            const response = await ProductService.getProductsPage(0, 0);
            setProducts(response.data.content);
            console.log("fetch all data");
        }catch(error) {
            console.error("Error fetch all products: ", error);
        }
    }

    const fetchDataAllAndFilter = async () => {
        try{
            const response = await ProductService.getProductsPage(0,0);
            const allProducts = response.data.content;
            setProducts(allProducts);

            if(searchQuery){
                setProducts(allProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())));
            }
            
        }catch(error){
            console.error("Error fetch all products with filter: ", error);
        }
    }

    const handleSearchButtonClick = () => {
        if(searchQuery){
            fetchDataAllAndFilter();
        }else {
            fetchDataByPage();
        }
    }

    const changeToPreviousPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const changeToNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const changeToPageOne = () => {
        setCurrentPage(1);
    }

    const toggleShowZeroStock = () => {
        setShowZeroStock(!showZeroStock);
    }

    const handleAddOneToCart = (productId) => {
        if(showAddedToCart){
            return;
        }
        const productAmount = 1;
        const response = CartService.postCart(productId, productAmount);
        setShowAddedToCart(true);
        setAddedProductId(productId);

        setTimeout(() => {
            setShowAddedToCart(false);
            setAddedProductId(null);
        },1000)
    }

    useEffect(() => {
        fetchDataByPage();
    }, [currentPage, productsPerPage]);

    return (
        <section className='product-list'>
            <h1 className='product-list-title'>Products</h1>

            <div className="product-list-container-buttons">

                <button type="button" className="btn btn-secondary" onClick={toggleShowZeroStock}>
                    {showZeroStock ? 'Hide Zero Stock' : 'Show Zero Stock'}
                </button>

                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="productsPerPage"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        >
                            Products Per Page
                    </button>
                    <div className="dropdown-menu" aria-labelledby='productsPerPage'>
                        <button className="dropdown-item" type='button' onClick={() => setProductsPerPage(5)}>5</button>
                        <button className="dropdown-item" type='button' onClick={() => setProductsPerPage(10)}>10</button>
                        <button className="dropdown-item" type='button' onClick={() => setProductsPerPage(30)}>30</button>
                    </div>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <button type="button" className="btn btn-secondary" onClick={handleSearchButtonClick}><FontAwesomeIcon icon={faSearch} /></button>
                </div>
            </div>

            <div className='container product-list-containers-items'>
                <div className="card-columns">
                    {products
                        .filter(product => showZeroStock || product.stock > 0)
                        .map(product => (
                            <div key={product.id} to={`${product.id}`} className="card product-list-product">
                                <Link to={`/products/${product.id}`} className="card-body product-list-product-main">
                                    <div>
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">Price: {product.price}$</p>
                                        <p className="card-text">Stock: {product.stock}</p>
                                    </div>
                                    <ProductImage className="product-list-product-main-image" productId={(product.id)}/>
                                </Link> 
                                {showAddedToCart && addedProductId === product.id ? (
                                    <button className='btn btn-secondary product-list-product-alert-added' >Added!</button>  
                                ) : (
                                    <button className='btn btn-secondary product-list-product-add-button' onClick={() => handleAddOneToCart(product.id)}>Add one to cart</button>                                             
                                )}
                            </div>
                        
                    ))}
                    <div className="product-list-navigation">
                        <button type="button" className="btn btn-secondary" onClick={changeToPreviousPage}><FontAwesomeIcon icon={faArrowLeft} /></button>
                        <div className='current-page-number btn btn-secondary' onClick={changeToPageOne}>{currentPage}</div> 
                        <button type="button" className="btn btn-secondary" onClick={changeToNextPage}><FontAwesomeIcon icon={faArrowRight} /></button>                
                    </div>
                </div>
            </div>
        </section>
      );
}

export default ProductList