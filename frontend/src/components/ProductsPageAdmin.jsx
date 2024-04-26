import React, { useEffect, useState } from 'react'
import ProductService from "../services/ProductService"
import AuthHeader from '../services/AuthHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('')

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

    useEffect(() => {
        fetchDataByPage();
        // fetchDataAll();
    }, [currentPage, productsPerPage]);

    useEffect(() =>{
        // console.log("Products: ", products)
    }, [products])


    return (
        <section>
            <h2>Product Page</h2>
            <div className="productPage-buttons-container">
                <Link type="button" className="btn btn-secondary" to="/manageProducts/addNewProduct">Add New Product</Link>

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

                <div className="search-bar ProductPage-search-bar">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <button type="button" className="btn btn-secondary" onClick={handleSearchButtonClick}><FontAwesomeIcon icon={faSearch} /></button>
                </div>
            </div>

            <div className='container'>
                <div className="card-columns">
                    {products.map(product => (
                        <Link key={product.id} to={`${product.id}`} className="card ProductPageAdmin-card-link">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Price: ${product.price}</p>
                                <p className="card-text">Stock: {product.stock}</p>
                            </div>
                        </Link>
                    ))}
                    <div className="btn-container">
                        <button type="button" className="btn btn-secondary" onClick={changeToPreviousPage}><FontAwesomeIcon icon={faArrowLeft} /></button>
                        <div className='current-page-number btn btn-secondary' onClick={changeToPageOne}>{currentPage}</div> 
                        <button type="button" className="btn btn-secondary" onClick={changeToNextPage}><FontAwesomeIcon icon={faArrowRight} /></button>                
                    </div>
                </div>
            </div>
        </section>
      );
    }

export default ProductPage