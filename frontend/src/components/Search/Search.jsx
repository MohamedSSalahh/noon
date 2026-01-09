import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import Image from '../Product/Image';
import { Box, Container, Grid, Typography, Paper, Chip, Stack, CircularProgress, Alert } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import StarIcon from '@mui/icons-material/Star';

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
            <Chip 
                icon={<StarIcon sx={{ fontSize: '12px !important', color: 'common.white' }} />} 
                label={
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {product.ratingsAverage || 4.5}
                        <Typography component="span" variant="caption" sx={{ opacity: 0.8 }}>({product.ratingsQuantity || 10})</Typography>
                    </Box>
                }
                size="small"
                sx={{ 
                    bgcolor: 'success.main', 
                    color: 'common.white', 
                    height: 20, 
                    fontSize: '0.75rem', 
                    '& .MuiChip-label': { px: 1 } 
                }}
            />
        );
    }

    if (isLoading) return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
            <CircularProgress color="primary" />
        </Box>
    );

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="xl" sx={{ px: { xs: 2, lg: 4 } }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, color: 'text.primary' }}>
                    Search results for <Typography component="span" variant="h5" color="primary" fontWeight={700}>"{keyword}"</Typography>
                </Typography>

                {products.length === 0 ? (
                    <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3, bgcolor: 'background.paper', boxShadow: 1 }}>
                        <Box sx={{ 
                            width: 100, 
                            height: 100, 
                            bgcolor: 'action.selected', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            mx: 'auto', 
                            mb: 3,
                            color: 'text.disabled'
                        }}>
                             <SearchOffIcon sx={{ fontSize: 48 }} />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>No products found</Typography>
                        <Typography color="text.secondary">We couldn't find any products matching your search.</Typography>
                    </Paper>
                ) : (
                    <Grid container spacing={2}>
                         {products.map((product) => (
                            <Grid item xs={6} md={3} lg={2.4} key={product._id}>
                                <Paper 
                                    component={Link} 
                                    to={`/${product.category?.name}/${product.subcategories?.[0]?._id}/${product._id}`} 
                                    sx={{ 
                                        display: 'block', 
                                        textDecoration: 'none', 
                                        height: '100%', 
                                        p: 2, 
                                        borderRadius: 2, 
                                        boxShadow: 1, 
                                        transition: 'all 0.3s', 
                                        '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' },
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Box sx={{ 
                                        width: '100%', 
                                        aspectRatio: '4/5', 
                                        mb: 2, 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        position: 'relative' 
                                    }}>
                                        <Image imgSrc={product.imageCover} imgAlt={product.title} className="max-h-full max-w-full object-contain" />
                                    </Box>
                                    
                                    <Typography variant="body2" color="text.primary" sx={{ 
                                        fontWeight: 500, 
                                        mb: 1, 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis', 
                                        display: '-webkit-box', 
                                        WebkitLineClamp: 2, 
                                        WebkitBoxOrient: 'vertical',
                                        flexGrow: 1
                                    }} title={product.title}>
                                        {product.title}
                                    </Typography>
                                    
                                    <Box sx={{ mt: 'auto' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1, mb: 1.5 }}>
                                            {product.price.toFixed(2)} <Typography component="span" variant="caption" color="text.secondary">EGP</Typography>
                                        </Typography>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <img src="/data/assets/svg/fulfilment_express_v2-en.svg" alt="express" style={{ height: 16 }} />
                                            { renderProductRating(product) }
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                         ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default Search;
