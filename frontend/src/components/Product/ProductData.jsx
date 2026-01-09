import React from 'react';
import { Box, Typography, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import Image from './Image';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductData = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ 
            productId: product.id, 
            color: product.colors?.[0] || 'Default', 
            quantity: Number(quantity) 
        }))
        .unwrap()
        .then(() => toast.success('Product added to cart'))
        .catch((err) => toast.error(err));
    };

    const renderOldPrice = () => {
        return <div className="flex items-center gap-2 text-sm text-noon-gray-500 mb-1">
                    <span>Was:</span>
                    <span className="line-through font-medium">EGP {product.old_price.toFixed(2)}</span>
                </div>
    }

    const renderNewPrice = () => {
        return <div className="flex items-center gap-2 text-xl mb-2">
                    <span className="text-noon-gray-500 text-sm">Now:</span>
                    <span className="font-bold text-noon-black">EGP {product.new_price.toFixed(2)}</span>
                    <span className="text-xs text-noon-gray-500">Inclusive of VAT</span>
                </div>
    }

    const renderSaving = () => {
        return <div className="flex items-center gap-2 text-sm font-bold text-noon-green mb-4">
                    <span>Saving:</span>
                    <span>EGP {(product.old_price - product.new_price).toFixed(2)}</span>
                    <div className="bg-noon-green/10 px-2 py-0.5 rounded text-xs">
                        {Math.floor(100 - (product.new_price / product.old_price) * 100)}% OFF
                    </div>
                </div>
    }

    const renderDeliveryDate = () => {

        const date = new Date();
        const month = date.toLocaleString('default', { month: 'short' });
        const dayNumber = date.getDate();
        const dayString = date.toLocaleString('default', { weekday: 'short' });
        
        return <div className="bg-noon-gray-50 p-3 rounded-lg mb-6 border border-noon-gray-200">
                    <p className="text-sm text-noon-black mb-2">
                        <strong className="text-noon-blue">Free delivery </strong>
                        by
                        <strong> {dayString} </strong>
                        ,
                        <strong> {month} {dayNumber} </strong>
                    </p>
                    <div className="w-24">
                        <Image imgSrc={"/data/assets/svg/fulfilment_express_v2-en.svg"} />
                    </div>
                </div>
    }

    const handleSelectChange = (e) => {
        setQuantity(e.target.value);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, mb: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>
                {product.brand_name}
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 500, mb: 1, lineHeight: 1.3 }}>
                {product.title}
            </Typography>
            <div className="flex items-center gap-4 mb-4">
                <p className="text-xs text-noon-gray-500">Model: {product.model_number || 'N/A'}</p>
                { product.rating ? (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-noon-green text-white text-xs px-2 py-0.5 rounded-full font-bold">
                            {product.rating} <i className="fa-solid fa-star text-[10px]"></i>
                        </div>
                        <p className="text-xs text-noon-gray-500 underline cursor-pointer">{product.ratingCount} Ratings</p>
                    </div>
                ) : "" }
            </div>
            
            <div className="border-t border-b border-gray-100 py-4 mb-4">
                { product.old_price ? renderOldPrice() : "" }
                { product.new_price ? renderNewPrice() : "" }
                { product.old_price ? renderSaving() : "" }
                <div className="mt-4 pt-4 border-t border-gray-100">
                     <h5 className="text-sm font-bold text-noon-black mb-1">Description</h5>
                     <p className="text-sm text-noon-gray-500 leading-relaxed">{product.description}</p>
                </div>
            </div>

            { renderDeliveryDate() }

            <div className="flex gap-4 mt-auto">
                <div className="w-24">
                    <Select
                        sx={{ 
                            width: "100%", 
                            height: "44px", 
                            fontFamily: "inherit",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0" },
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#cbd5e1" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3866df" }
                        }}
                        value={quantity}
                        onChange={handleSelectChange}
                    >
                        {[...Array(10)].map((_, i) => (
                            <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                        ))}
                    </Select>
                </div>

                <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-noon-blue text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-soft hover:shadow-hover"
                >
                    Add To Cart
                </button>
            </div>
        </Box>
    );
}

export default ProductData;