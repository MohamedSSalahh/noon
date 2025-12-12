import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import Image from '../Product/Image';

const Search = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.productState);

    useEffect(() => {
        if (keyword) {
            dispatch(fetchProducts(`keyword=${keyword}`));
        }
    }, [keyword, dispatch]);

    const renderProductRating = (product) => {
        return (
            <div className="flex items-center gap-1 bg-noon-green text-white text-[10px] px-1.5 py-0.5 rounded-full">
                <span>{product.ratingsAverage || 4.5}</span>
                <i className="fa-solid fa-star text-[8px]"></i>
                <span className="text-white/80 ml-1">({product.ratingsQuantity || 10})</span>
            </div>
        );
    }

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-noon-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-noon-blue"></div>
        </div>
    );

    return (
        <div className="bg-noon-gray-100 min-h-screen pb-12 pt-6">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                <h1 className="text-xl font-bold text-noon-black mb-6">
                    Search results for <span className="text-noon-blue">"{keyword}"</span>
                </h1>

                {products.length === 0 ? (
                    <div className="bg-white rounded-lg p-12 text-center shadow-sm">
                        <img src="/data/assets/svg/empty_state.svg" alt="No results" className="mx-auto h-48 mb-6 opacity-50" />
                        <h2 className="text-lg font-bold text-gray-800 mb-2">No products found</h2>
                        <p className="text-gray-500">We couldn't find any products matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                         {products.map((product) => (
                            <Link to={`/${product.category?.name}/${product.subcategories?.[0]?._id}/${product._id}`} key={product._id} className="block">
                                <div className="bg-white rounded-lg p-3 cursor-pointer hover:shadow-hover transition-shadow duration-300 border border-transparent hover:border-noon-gray-200 h-full flex flex-col">
                                    <div className="w-full aspect-[4/5] mb-3 relative flex items-center justify-center">
                                        <Image imgSrc={product.imageCover} imgAlt={product.title} className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <p className="text-sm text-noon-black line-clamp-2 mb-2 flex-grow" title={product.title}>{product.title}</p>
                                    <div className="mt-auto">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xs text-noon-gray-500">EGP</span>
                                            <span className="text-lg font-bold text-noon-black">{product.price.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <img src="/data/assets/svg/fulfilment_express_v2-en.svg" alt="express" className="h-4" />
                                            { renderProductRating(product) }
                                        </div>
                                    </div>
                                </div>
                            </Link>
                         ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
