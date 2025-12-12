import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../../redux/slices/wishListSlice';

import { Link } from 'react-router-dom';

const Wishlist = () => {
    const dispatch = useDispatch();
    const { wishlist, isLoading, error } = useSelector((state) => state.wishListState);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    const handleRemove = (productId) => {
        dispatch(removeFromWishlist(productId));
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-noon-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-noon-blue"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-noon-gray-100">
             <div className="bg-red-50 border-l-4 border-noon-red p-4">
                <p className="text-noon-red">Error: {error}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-noon-gray-100 min-h-screen pb-12 pt-6">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                <h1 className="text-2xl font-bold font-heading text-noon-black mb-6">My Wishlist</h1>
                
                {wishlist.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <div className="w-24 h-24 bg-noon-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="far fa-heart text-4xl text-noon-gray-400"></i>
                        </div>
                        <h2 className="text-xl font-bold text-noon-black mb-2">Your wishlist is empty</h2>
                        <p className="text-noon-gray-500 mb-6">Save items you love to buy later.</p>
                        <Link to="/" className="inline-block bg-noon-blue text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-soft hover:shadow-hover">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlist.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                                <div className="relative pt-[100%] bg-white p-4">
                                    <img src={product.imageCover} alt={product.title} className="absolute top-0 left-0 w-full h-full object-contain p-4" />
                                    <button 
                                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-noon-gray-400 hover:text-noon-red transition-colors"
                                        onClick={() => handleRemove(product._id)}
                                        title="Remove from Wishlist"
                                    >
                                        <i className="fas fa-trash-alt text-sm"></i>
                                    </button>
                                </div>
                                <div className="p-4 flex-grow flex flex-col">
                                    <h3 className="text-sm font-medium text-noon-black line-clamp-2 mb-2 h-10">{product.title}</h3>
                                    <div className="flex items-center justify-between mt-auto">
                                        <p className="text-lg font-bold text-noon-black">{product.price} <span className="text-xs font-normal text-noon-gray-500">EGP</span></p>
                                    </div>
                                    <Link 
                                        to={`/${product.category?.name || 'category'}/${product.category?._id || 'id'}/${product._id}`} 
                                        className="mt-4 block w-full text-center border border-noon-blue text-noon-blue font-bold py-2 rounded-lg hover:bg-noon-blue hover:text-white transition-colors"
                                    >
                                        View Product
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
