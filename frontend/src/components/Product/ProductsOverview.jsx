import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from './Image';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishListSlice';

const ProductsOverview = ({ data }) => {
    const productsContainer = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { wishlist } = useSelector((state) => state.wishListState);

    const isInWishlist = (productId) => {
        return wishlist.some(item => item._id === productId);
    };

    const handleWishlistToggle = (e, product) => {
        e.stopPropagation();
        if (isInWishlist(product.id)) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist({ productId: product.id }));
        }
    };

    const renderProductOldPrice = (product) => {
        const discount = Math.floor(100 - (product.new_price / product.old_price) * 100);
        return (
            <div className="flex items-center gap-2 text-xs mt-1">
                <span className="text-noon-gray-500 line-through">EGP {product.old_price.toFixed(2)}</span>
                <span className="text-noon-green font-bold">{discount}% OFF</span>
            </div>
        );
    }

    const renderProductRating = (product) => {
        return (
            <div className="flex items-center gap-1 bg-noon-green text-white text-[10px] px-1.5 py-0.5 rounded-full">
                <span>{product.rating}</span>
                <i className="fa-solid fa-star text-[8px]"></i>
                <span className="text-white/80 ml-1">({parseInt(product.ratingCount)})</span>
            </div>
        );
    }

    const renderProducts = () => {
        if (data.products) return data.products.map(product => {
            if (product.image) {
                const isLiked = isInWishlist(product.id);
                const [intPrice, decPrice] = product.new_price.toFixed(2).split('.');
                
                return (
                    <div
                        key={product.id}
                        className="min-w-[190px] w-[190px] bg-white cursor-pointer hover:shadow-hover transition-shadow duration-300 relative group/product flex flex-col pb-2"
                        onClick={() => handleProductOnClick(product)}
                    >
                         {/* Wishlist Button: Only visible on hover or if active */}
                        <button 
                            className={`absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-200 ${isLiked ? 'text-noon-red opacity-100' : 'text-gray-400 opacity-0 group-hover/product:opacity-100 hover:text-noon-red'}`}
                            onClick={(e) => handleWishlistToggle(e, product)}
                        >
                            <i className={`${isLiked ? 'fas' : 'far'} fa-heart text-sm`}></i>
                        </button>

                        {/* Image */}
                        <div className="w-full h-[210px] p-4 flex items-center justify-center bg-white relative">
                            {/* Best Seller or other badges can go here */}
                             <Image imgSrc={product.image} imgAlt={product.title} className="max-h-full max-w-full object-contain" />
                        </div>

                        {/* Content */}
                        <div className="px-3 flex flex-col flex-1">
                            
                            {/* Title */}
                            <p className="text-[13px] text-noon-black/90 leading-5 line-clamp-2 h-10 mb-1 font-normal" title={product.title}>
                                {product.title}
                            </p>

                            {/* Rating */}
                             <div className="flex items-center gap-2 mb-1 min-h-[18px]">
                                {product.ratingCount > 0 ? (
                                    <>
                                         <div className="flex items-center gap-1 bg-green-700 text-white text-[11px] font-bold px-1.5 py-[1px] rounded-[10px]">
                                            <span>{product.rating}</span>
                                            <i className="fa-solid fa-star text-[7px] mt-[1px]"></i>
                                        </div>
                                        <span className="text-gray-400 text-xs">({product.ratingCount})</span>
                                    </>
                                ) : (
                                    <span className="text-gray-300 text-xs">No ratings</span> // Placeholder for alignment
                                )}
                            </div>


                            {/* Price Section */}
                            <div className="flex flex-col mb-1">
                                <div className="flex items-baseline gap-[2px]">
                                    <span className="text-[10px] text-gray-500 font-medium uppercase">EGP</span>
                                    <span className="text-lg font-bold text-noon-black">{intPrice}</span>
                                    <span className="text-[10px] font-bold text-noon-black align-top mt-[2px]">.{decPrice}</span>
                                </div>
                                
                                {/* Old Price & Discount */}
                                {product.old_price ? (
                                    <div className="flex items-center gap-2 text-[11px]">
                                        <span className="text-gray-400 line-through decoration-gray-400">EGP {product.old_price.toFixed(2)}</span>
                                        <span className="text-green-600 font-bold">{Math.floor(100 - (product.new_price / product.old_price) * 100)}% OFF</span>
                                    </div>
                                ) : <div className="h-[17px]"></div>}
                            </div>
                            
                            {/* Noon Express & Delivery */}
                            <div className="mt-auto space-y-1">
                                 <div className="h-4">
                                     <img src="/data/assets/svg/fulfilment_express_v2-en.svg" alt="noon-express" className="h-4 object-contain" />
                                 </div>
                                 <p className="text-[11px] text-gray-500">
                                     Get it <span className="font-bold text-noon-black">Sat, Sep 23</span>
                                 </p>
                            </div>
                        </div>
                    </div>
                );
            } 
            return null;
        });
    }

    const handleProductOnClick = (product) => {
        navigate(`/${product.category.title}/${product.subCategory.id}/${product.id}`)
    }

    const scrollProductsToLeft = () => {
        productsContainer.current.scrollBy({ left: -300, behavior: 'smooth' });
    }

    const scrollProductsToRight = () => {
        productsContainer.current.scrollBy({ left: 300, behavior: 'smooth' });
    }

    if (data) return (
        <div className="bg-white p-4 lg:p-6 mb-4">
            <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-2xl font-bold text-noon-black">{data.title}</h2>
                <button className="text-sm font-bold text-noon-black border-2 border-noon-black px-6 py-2 rounded-[4px] hover:bg-white hover:opacity-80 transition-opacity uppercase tracking-wide">
                    VIEW ALL
                </button>
            </div>
            <div className="relative group">
                <button 
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-card rounded-full flex items-center justify-center text-noon-black opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-6 hover:scale-110"
                    onClick={scrollProductsToLeft}
                >
                    <i className="fa-solid fa-chevron-left text-lg"></i>
                </button>
                <div 
                    ref={productsContainer} 
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    { renderProducts() }
                </div>
                <button 
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-card rounded-full flex items-center justify-center text-noon-black opacity-0 group-hover:opacity-100 transition-all duration-300 -mr-6 hover:scale-110"
                    onClick={scrollProductsToRight}
                >
                    <i className="fa-solid fa-chevron-right text-lg"></i>
                </button>
            </div>
        </div>
    );
}

export default ProductsOverview;