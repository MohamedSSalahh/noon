import React, { Suspense } from 'react';
import { Box, Container, Stack, Grid, Breadcrumbs, Link as MuiLink, Typography, Paper } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 6 }}>
            { product.id && (
                <Container maxWidth="xl" sx={{ px: { xs: 2, lg: 4 }, pt: 3 }}>
                    <Suspense fallback={<Spinner />}>
                        <Breadcrumbs 
                            separator={<NavigateNextIcon fontSize="small" />} 
                            aria-label="breadcrumb"
                            sx={{ mb: 2 }}
                        >
                            <Link to={`/${product.category.title}`} style={{ textDecoration: 'none' }}>
                                <Typography color="text.secondary" sx={{ textTransform: 'capitalize', '&:hover': { color: 'primary.main' } }}>
                                    {product.category.title}
                                </Typography>
                            </Link>
                            <Link to="" style={{ textDecoration: 'none' }}>
                                <Typography color="text.secondary" sx={{ textTransform: 'capitalize', '&:hover': { color: 'primary.main' } }}>
                                    {product.subCategory.title}
                                </Typography>
                            </Link>
                            <Typography color="text.primary" sx={{ maxWidth: 200 }} noWrap>
                                {product.title}
                            </Typography>
                        </Breadcrumbs>

                        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 1 }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} lg={4}>
                                    <Box sx={{ 
                                        width: '100%', 
                                        aspectRatio: '1/1', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        maxHeight: 400
                                    }}>
                                        <Image imgSrc={product.image} imgAlt={product.title} className="max-w-full max-h-full object-contain" />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} lg={4} sx={{ borderRight: { lg: 1 }, borderColor: { lg: 'divider' } }}>
                                    <ProductData product={product} />
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <MoreData product={product} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Suspense>
                </Container>
            )}
            
            <Box sx={{ mt: 4 }}>
                 <Suspense fallback={''}>
                    <Container maxWidth="xl" sx={{ px: { xs: 2, lg: 4 }, spaceY: 4 }}>
                        <Stack spacing={4}>
                            <ProductReviews productId={product._id} />
                            <ProductsOverview data={{ ...subCategoryDeal, title: `${subCategory.title} deals` }}/>
                            <ProductsOverview data={{ ...subCategory, title: `More ${subCategory.title}` }}/>
                        </Stack>
                    </Container>
                </Suspense>
            </Box>
        </Box>
    );
}

export default Product;