import React, { useEffect, useState } from 'react'
import '../styles/Cart.css'
import CartService from '../services/CartService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { button } from '@nextui-org/react';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [showSavedAmount, setShowSavedAmount] = useState(false);
    const [savedAmountCartId, setSavedAmountCartId] = useState(null);
    const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);
    const [cartSum, setCartSum] = useState(0);

    const handleChangeProductAmount = (cartId, newAmount) => {
        setCartItems(prevCartItems => {
            return prevCartItems.map(cartItem => {
                if (cartItem.id === cartId) {
                    return { ...cartItem, productAmount: newAmount };
                }
                return cartItem;
            });
        });
    }

    const decreaseProductAmountByOne = (cartId) => {
        setCartItems(prevCartItems => {
            return prevCartItems.map(cartItem => {
                if (cartItem.id === cartId && cartItem.productAmount > 1) {
                    return { ...cartItem, productAmount: cartItem.productAmount - 1 };
                }
                return cartItem;
            });
        });
    }

    const increaseProductAmountByOne = (cartId) => {
        setCartItems(prevCartItems => {
            return prevCartItems.map(cartItem => {
                if (cartItem.id === cartId) {
                    return { ...cartItem, productAmount: cartItem.productAmount + 1  };
                }
                return cartItem;
            });
        });
    }

    const fetchData = async () => {
        try{
            const response = await CartService.getCartItemList();
            setCartItems(response.data);
            // console.log(cartItems);
        }catch(error){
            if(error.response && error.response.status === 404) {
                console.error("Cart items not found:", error);
                setShowEmptyCartAlert(true);
            }
            console.error("Error fetching product:", error);
        }
    }

    const handleDeleteCartItem = (cartId) => {
        try{
            CartService.deleteCart(cartId).then(() =>
                fetchData());
        }catch(error){
            console.error("Error while deleting cart item: ", error);
        }
    }

    const handleProductAmountSave = async (cartId, productAmount) => { 
        try{
            CartService.putCartProductAmount(cartId, productAmount);
            setShowSavedAmount(true);
            setSavedAmountCartId(cartId);
            setTimeout(() => {
                setShowSavedAmount(false);
                setSavedAmountCartId(null);
            },1000)
        }catch(error){
            console.error("Error while updating product amount: ", error);
        }
    }

    
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        let sum = 0;
        cartItems.forEach(cartItem => {
            sum += cartItem.productPrice * cartItem.productAmount;
        });
        setCartSum(sum);
    }, [cartItems])

  return (
    <section className='cart'>
        <h1>Your Cart</h1>

        <div className="container">
            {showEmptyCartAlert &&
            (
                <div className="alert alert-info cart-alert-cart-empty">Your cart is empty</div>
            )}
            <div className="card-columns">
                    {cartItems.map(cartItem => (
                        <div key={cartItem.id} className="card cart-cart">
                            <Link to={`/products/${cartItem.productId}`} className="card-body cart-card-body">
                                <h5 className="card-text">{cartItem.productName}</h5>
                                <p className="card-text">Price: {cartItem.productPrice}$</p>
                                <p className="card-text">Price total: {(cartItem.productPrice * cartItem.productAmount).toFixed(2)}</p>
                            </Link>
                            <div className='cart-buttons'>
                                <div className="cart-buttons-amount">
                                    <button className='btn btn-secondary cart-amount-minus' onClick={() => decreaseProductAmountByOne(cartItem.id)}><FontAwesomeIcon icon={faMinus}/></button>
                                    <input
                                        type="number"
                                        className='cart-stock-amount' 
                                        value={cartItem.productAmount}
                                        onChange={(e) => handleChangeProductAmount(cartItem.id, parseInt(e.target.value))}
                                        inputMode="numeric"
                                    />
                                    <button className='btn btn-secondary cart-amount-plus'onClick={() => increaseProductAmountByOne(cartItem.id)} ><FontAwesomeIcon icon={faPlus}/></button>
                                    {showSavedAmount && savedAmountCartId == cartItem.id ? 
                                    (
                                        <button className="btn btn-secondary cart-amount-alert-saved">Saved!</button>
                                    ):
                                    (<button className="btn btn-secondary cart-amount-save" onClick={
                                        () => handleProductAmountSave(cartItem.id ,cartItem.productAmount)}>Save Amount</button>
                                    )  
                                    }
                                </div>
                                <FontAwesomeIcon icon={faTimes} onClick={() => handleDeleteCartItem(cartItem.id)} className="cart-buttons-delete" />
                            </div>
                        </div>
                    ))}
            </div>
            <div className="container cart-sum">Sum of cart: {cartSum}$</div>
        </div>
    </section>
  )
}

export default Cart