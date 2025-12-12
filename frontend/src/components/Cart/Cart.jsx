import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, removeFromCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_URL from '../../utils/apiConfig';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems, totalCartPrice, isLoading, error, cartId } = useSelector((state) => state.cartState);
    const { token } = useSelector((state) => state.authState);

    useEffect(() => {
        if (token) {
            dispatch(fetchCart());
        }
    }, [dispatch, token]);

    const handleRemove = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleCheckout = () => {
        if (!cartId) return;
        
        // Direct call to creating session as per orderController
        fetch(`${API_URL}/orders/checkout-session/${cartId}`, {
           method: 'GET',
           headers: {
               Authorization: `Bearer ${token}`
           }
        })
        .then(res => res.json())
        .then(data => {
            if(data.session && data.session.url) {
                window.location.href = data.session.url;
            } else {
                 console.error("No session URL", data);
                 toast.error("Could not initiate checkout.");
            }
        })
        .catch(err => {
            console.error(err);
            toast.error("Checkout failed. Please try again.");
        });
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-10 h-10 border-4 border-noon-yellow border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
             <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
                <p className="text-red-700 font-medium">Error: {error}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 font-heading">Shopping Cart</h1>
                
                {(!cartItems || cartItems.length === 0) ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                             <i className="fas fa-shopping-bag text-4xl"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Browse our categories to find amazing deals!</p>
                        <Link to="/" className="inline-block btn-primary">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items List */}
                        <div className="flex-grow space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-white p-6 rounded-xl shadow-sm flex gap-6 items-start border border-gray-100">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center">
                                        <img 
                                            src={item.product?.imageCover?.startsWith('http') ? item.product.imageCover : `${API_URL}/products/${item.product.imageCover}`}
                                            alt={item.product?.title} 
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                    <div className="flex-grow flex flex-col justify-between min-h-[128px]">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">{item.product?.title}</h3>
                                            <p className="text-sm text-gray-500 mb-2">Color: <span className='text-gray-700 font-medium'>{item.color}</span></p>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs text-gray-500">Sold by</span>
                                                <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">{item.product?.brand?.name || 'Noon'}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between mt-4 border-t border-gray-50 pt-4">
                                            <button 
                                                className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1.5 transition-colors group"
                                                onClick={() => handleRemove(item._id)}
                                                title="Remove item"
                                            >
                                                <i className="far fa-trash-alt group-hover:scale-110 transition-transform"></i> 
                                                <span>Remove</span>
                                            </button>
                                            
                                            <div className='text-right'>
                                                 <p className="text-xs text-gray-400 mb-0.5">{item.quantity} x {item.price}</p>
                                                 <p className="text-xl font-bold text-gray-900">{item.price * item.quantity} <span className="text-xs font-normal text-gray-500">EGP</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Order Summary */}
                        <div className="w-full lg:w-96 flex-shrink-0">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span className="font-medium">{totalCartPrice} EGP</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                </div>
                                
                                <div className="border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <div className='text-right'>
                                            <span className="text-2xl font-bold text-gray-900">{totalCartPrice}</span>
                                            <span className="text-xs text-gray-500 ml-1">EGP</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 text-right">Inclusive of VAT</p>
                                </div>
                                
                                <button 
                                    onClick={handleCheckout}
                                    className="w-full bg-noon-yellow text-noon-black font-bold py-3.5 rounded-lg hover:bg-yellow-400 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mb-4"
                                >
                                    <span>Checkout</span>
                                    <i className="fas fa-arrow-right"></i>
                                </button>
                                
                                <div className="flex items-center justify-center gap-3 opacity-60">
                                    <i className="fab fa-cc-visa text-2xl text-gray-600"></i>
                                    <i className="fab fa-cc-mastercard text-2xl text-gray-600"></i>
                                    <span className="text-xs text-gray-500 border-l border-gray-300 pl-3">Secure Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
