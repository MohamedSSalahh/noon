import React, { Suspense } from 'react';

import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDealsProducts, getProduct, getSubCategory } from '../../apis/products';
import Image from './Image';
import { removeSelectedProduct } from '../../redux/slices/categorySlice';
import { lazy } from 'react';
import Spinner from '../Spinner/Spinner';
import ProductReviews from './ProductReviews';


const Product = () => {

    const ProductsOverview = lazy(async () =>  {
        return new Promise(resolve => setTimeout(resolve, 2000)).then(
          () => import("./ProductsOverview")
        );
    });
    
    const ProductData = lazy(async () =>  {
        return new Promise(resolve => setTimeout(resolve, 1000)).then(
          () => import("./ProductData")
        );
    });
    
    const MoreData = lazy(async () =>  {
        return new Promise(resolve => setTimeout(resolve, 500)).then(
          () => import("./MoreData")
        );
    });

    const subCategory = useSelector(({ categoryState }) => categoryState.selectedSubCategory);
    const subCategoryDeal = useSelector(({ collectionState }) => collectionState.deals[`${subCategory.title} deals`]);
    const product = useSelector(({ categoryState }) => categoryState.selectedProduct);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if (product.id) document.title = `${product.title} | Online Shopping`;
        return () => document.title = "Online Shopping";
    }, [product]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        getProduct(dispatch, params.subID, params.productID);
        getSubCategory(dispatch, params.subID);
        getAllDealsProducts(dispatch, 5);
        return () => dispatch(removeSelectedProduct());
    }, [params, dispatch]);

    return (
        <div className="bg-noon-gray-100 min-h-screen pb-12">
            { product.id ?
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 pt-4">
                    <Suspense fallback={<Spinner />}>
                        <div className="flex items-center gap-2 text-xs text-noon-gray-500 mb-4">
                                    <Link to={`/${product.category.title}`} className="hover:text-noon-blue capitalize">{product.category.title}</Link>
                                    <span><i className="fa-solid fa-chevron-right text-[10px]"></i></span>
                                    <Link to="" className="hover:text-noon-blue capitalize">{product.subCategory.title}</Link>
                                    <span><i className="fa-solid fa-chevron-right text-[10px]"></i></span>
                                    <span className="text-noon-black truncate max-w-[200px]">{product.title}</span>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-6 bg-white p-6 rounded-lg shadow-sm">
                                <div className="w-full lg:w-1/3 flex justify-center items-start">
                                    <div className="w-full max-w-[400px] aspect-square flex items-center justify-center">
                                        <Image imgSrc={product.image} imgAlt={product.title} className="max-w-full max-h-full object-contain" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/3 border-r border-gray-100 pr-6">
                                    <ProductData product={product} />
                                </div>
                                <div className="w-full lg:w-1/3">
                                    <MoreData product={product} />
                                </div>
                        </div>
                    </Suspense>
                </div> : ""}
            <Suspense fallback={''}>
                <div className="max-w-[1440px] mx-auto px-4 lg:px-8 mt-8 space-y-8">
                    <ProductReviews productId={product._id} />
                    <ProductsOverview data={{ ...subCategoryDeal, title: `${subCategory.title} deals` }}/>
                    <ProductsOverview data={{ ...subCategory, title: `More ${subCategory.title}` }}/>
                </div>
            </Suspense>
        </div>
    );
}

export default Product;