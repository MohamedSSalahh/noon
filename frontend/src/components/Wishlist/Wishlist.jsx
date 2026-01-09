import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, removeFromWishlist } from '../../redux/slices/wishListSlice';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Paper, IconButton, CircularProgress, Alert, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
            <CircularProgress color="primary" />
        </Box>
    );

    if (error) return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 2 }}>
             <Alert severity="error" variant="filled">{error}</Alert>
        </Box>
    );

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="xl" sx={{ px: { xs: 2, lg: 4 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, fontFamily: 'inherit' }}>My Wishlist</Typography>
                
                {wishlist.length === 0 ? (
                    <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3, bgcolor: 'background.paper', boxShadow: 1 }}>
                        <Box sx={{ 
                            width: 100, 
                            height: 100, 
                            bgcolor: 'action.hover', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            mx: 'auto', 
                            mb: 3,
                            color: 'text.secondary'
                        }}>
                             <FavoriteBorderIcon sx={{ fontSize: 48 }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Your wishlist is empty</Typography>
                        <Typography color="text.secondary" sx={{ mb: 4 }}>Save items you love to buy later.</Typography>
                        <Button 
                            component={Link} 
                            to="/" 
                            variant="contained" 
                            size="large"
                            sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
                        >
                            Continue Shopping
                        </Button>
                    </Paper>
                ) : (
                    <Grid container spacing={3}>
                        {wishlist.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                                <Paper sx={{ borderRadius: 3, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 1, position: 'relative', '&:hover': { boxShadow: 4, transform: 'translateY(-4px)', transition: 'all 0.3s' } }}>
                                     <Box sx={{ position: 'relative', pt: '100%', bgcolor: 'background.paper' }}>
                                        <img 
                                            src={product.imageCover} 
                                            alt={product.title} 
                                            style={{ 
                                                position: 'absolute', 
                                                top: 0, 
                                                left: 0, 
                                                width: '100%', 
                                                height: '100%', 
                                                objectFit: 'contain', 
                                                padding: '16px' 
                                            }} 
                                        />
                                        <IconButton 
                                            sx={{ 
                                                position: 'absolute', 
                                                top: 8, 
                                                right: 8, 
                                                bgcolor: 'background.paper', 
                                                boxShadow: 1,
                                                '&:hover': { bgcolor: 'error.light', color: 'error.contrastText' }
                                            }}
                                            onClick={() => handleRemove(product._id)}
                                            size="small"
                                        >
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                     </Box>
                                     
                                     <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                         <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', minHeight: 40 }}>
                                             {product.title}
                                         </Typography>
                                         
                                         <Box sx={{ mt: 'auto' }}>
                                             <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                                 {product.price} <Typography component="span" variant="caption" color="text.secondary">EGP</Typography>
                                             </Typography>
                                             
                                             <Button 
                                                 component={Link}
                                                 to={`/${product.category?.name || 'category'}/${product.category?._id || 'id'}/${product._id}`} 
                                                 variant="outlined" 
                                                 fullWidth
                                                 sx={{ fontWeight: 700 }}
                                             >
                                                 View Product
                                             </Button>
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

export default Wishlist;
