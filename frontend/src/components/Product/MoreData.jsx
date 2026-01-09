import React from 'react';
import { Box } from '@mui/material';
import Image from './Image';

const MoreData = ({ product }) => {

    const renderHassleFree = () => {
           return <div className="flex items-start gap-3 p-3 bg-white border border-noon-gray-200 rounded-lg mb-4">
                <div className="w-8 h-8 shrink-0">
                    <Image imgSrc={"/data/assets/svg/free_returns.svg"} imgAlt={"Free Returns"} className="w-full h-full" />
                </div>
                <div>
                    <p className="text-sm text-noon-black font-medium">Enjoy hassle free returns with this offer.</p>
                    <span className="text-xs text-noon-blue font-bold cursor-pointer hover:underline">Learn More</span>
                </div>
            </div>
    }

    const renderSellerInfo = () => {
           return  <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-noon-gray-100 p-1 flex items-center justify-center">
                                <Image imgSrc={"/data/assets/svg/seller.svg"} imgAlt={"Seller"} className="w-full h-full" />
                            </div>
                            <div>
                                <p className="text-sm text-noon-black">Sold by <strong className="text-noon-blue cursor-pointer">{product.sold_by}</strong></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 pl-11">
                            <div className="flex items-center gap-1 bg-noon-yellow text-noon-black text-xs px-2 py-0.5 rounded-full font-bold">
                                {product.rating || "4.5"}
                                <i className="fa-solid fa-star text-[10px]"></i>
                            </div>
                            { product.seller_positive_ratings ? <div className="text-xs text-noon-gray-500 font-medium">{product.seller_positive_ratings} Positive Ratings</div> : "" }
                        </div>
                    </div>
    }

    const renderSellerAchievements = () => {
           return  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        <div className="flex items-center gap-2 bg-noon-gray-50 px-3 py-2 rounded-lg border border-noon-gray-200 min-w-max">
                            <div className="w-6 h-6">
                                <Image imgSrc={"/data/assets/png/badge_low_returns_seller.png"} imgAlt={"Low Return"} />
                            </div>
                            <h3 className="text-xs font-bold text-noon-black">Low Return Seller</h3>
                        </div>
                        <div className="flex items-center gap-2 bg-noon-gray-50 px-3 py-2 rounded-lg border border-noon-gray-200 min-w-max">
                            <div className="w-6 h-6">
                                <Image imgSrc={"/data/assets/png/badge_great_recent_rating.png"} imgAlt={"Greet Recent Rating"} />
                            </div>
                            <h3 className="text-xs font-bold text-noon-black">Great Recent Rating</h3>
                        </div>
                    </div>
    }

    const renderFasilities = () => {
        return  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 p-2 bg-noon-gray-50 rounded-full flex items-center justify-center shrink-0">
                            <Image imgSrc={"/data/assets/svg/free_returns_usp.svg"} />
                        </div>
                        <div>
                            <h5 className="text-xs font-bold text-noon-black mb-0.5">FREE RETURNS</h5>
                            <p className="text-xs text-noon-gray-500">Get free returns on eligible items</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 p-2 bg-noon-gray-50 rounded-full flex items-center justify-center shrink-0">
                            <Image imgSrc={"/data/assets/svg/trusted_shipping_usp_v2.svg"} />
                        </div>
                        <div>
                            <h5 className="text-xs font-bold text-noon-black mb-0.5">TRUSTED SHIPPING</h5>
                            <p className="text-xs text-noon-gray-500">Free shipping when you spend EGP 200 and above on express items</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 p-2 bg-noon-gray-50 rounded-full flex items-center justify-center shrink-0">
                            <Image imgSrc={"/data/assets/svg/secure_usp.svg"} />
                        </div>
                        <div>
                            <h5 className="text-xs font-bold text-noon-black mb-0.5">SECURE SHOPPING</h5>
                            <p className="text-xs text-noon-gray-500">Your data is always protected</p>
                        </div>
                    </div>
                </div>
    }

    return (
        <Box sx={{ height: '100%' }}>
            { renderHassleFree() }
            { renderSellerInfo() }
            { renderSellerAchievements() }
            <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2, mt: 2 }}>
                { renderFasilities() }
            </Box>
        </Box>
    );
}

export default MoreData;