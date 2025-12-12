import React, { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategoryProducts } from '../../apis/products';
import { getSlider } from '../../apis/sliders';
import ImageSlider from '../Collection/ImageSlider';
// import Footer from '../Footer/Footer';
import Spinner from '../Spinner/Spinner';


const Category = () => {

    const ProductsOverview = lazy(async () =>  {
        return new Promise(resolve => setTimeout(resolve, 1000)).then(
          () => import("../Product/ProductsOverview")
        );
    });



    const params = useParams();
    const dispatch = useDispatch();
    const slider = useSelector(({ collectionState }) => collectionState.sliders[ params.categoryTitle === "home" ? "home-kitchen" : params.categoryTitle]);
    const subCategories = useSelector(({ categoryState }) => categoryState.subCategories);

    const renderProductsOverviews = () => {
        if (subCategories) return subCategories.map(sub => <ProductsOverview key={sub.title} data={{ title: sub.title, products: sub.products }} />);
      }

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `${params.categoryTitle.charAt(0).toUpperCase()}${params.categoryTitle.slice(1)} | Online Shopping`;
        getSlider(dispatch, params.categoryTitle === "home" ? "home-kitchen" : params.categoryTitle);
        getCategoryProducts(dispatch, params.categoryTitle);
    }, [params, dispatch]);

    return (
        <div className="bg-noon-gray-100 min-h-screen pb-12">
            <Suspense fallback={<Spinner />}>
                <div className="max-w-[1440px] mx-auto">
                    <ImageSlider slider={slider} />    
                    <div className="px-4 lg:px-8 space-y-6">
                        {renderProductsOverviews()} 
                    </div>
                </div>
            </Suspense>

        </div>
    );
}

export default Category;