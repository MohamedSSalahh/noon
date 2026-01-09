import React, { lazy, Suspense } from 'react';
import { Box, Container, Stack } from '@mui/material';
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
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 6 }}>
            <Suspense fallback={<Spinner />}>
                <Container maxWidth="xl" sx={{ px: { xs: 2, lg: 4 } }}>
                    <ImageSlider slider={slider} />    
                    <Stack spacing={3} sx={{ mt: 3 }}>
                        {renderProductsOverviews()} 
                    </Stack>
                </Container>
            </Suspense>
        </Box>
    );
}

export default Category;