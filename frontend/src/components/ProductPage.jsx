import React, { useEffect, useState } from 'react'
import ProductService from "../services/ProductService"
import AuthHeader from '../services/AuthHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';






const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);

    const fetchData = async () => {
        try {
          const response = await ProductService.GetProductsPage(currentPage - 1, productsPerPage);
        //   console.log(response.data.content);
          setProducts(response.data.content);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
    };

    const changeToPreviousPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const changeToNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const changeToPageOne = () => {
        setCurrentPage(1);
    }

    useEffect(() => {
        fetchData();
    }, [currentPage, productsPerPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

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
            </div>

            <div className='container'>
                <div className="card-columns">
                    {products.map(product => (
                        <div key={product.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Price: ${product.price}</p>
                                <p className="card-text">Stock: {product.stock}</p>
                            </div>
                        </div>
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