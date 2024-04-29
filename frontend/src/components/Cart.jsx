import React, { useEffect, useState } from 'react'
import '../styles/Cart.css'
import CartService from '../services/CartService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [cartSum, setCartSum] = useState(0);

    const fetchData = async () => {
        try{
            const response = await CartService.getCartList();
            setCartItems(response.data);
            // console.log(cartItems);
        }catch(error){
            console.error("Error fetching product:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


  return (
    <section className='cart'>
        <h1>Your Cart</h1>

        <div className="container">
            <div className="card-columns">
                    {cartItems.map(cartItem => (
                        <div key={cartItem.id} className="card cart-cart">
                            <Link to={`/products/${cartItem.productId}`} className="card-body cart-card-body">
                                <h5 className="card-text">product name:  {cartItem.productName}</h5>
                                <p className="card-text">Amount {cartItem.productAmount}</p>
                            </Link>
                            <div className='cart-stock-buttons'>
                                <button className='btn btn-secondary' ><FontAwesomeIcon icon={faMinus} /></button>
                                <input
                                    type="number" 
                                    className='cart-stock-amount' 
                                    value={cartItem.productAmount}
                                    // onChange={(e) => setStockAmount(parseInt(e.target.value))}
                                    inputMode="numeric"
                                />
                                <button className='btn btn-secondary' ><FontAwesomeIcon icon={faPlus} /></button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    </section>
  )
}

export default Cart