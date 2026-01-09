import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, removeFromCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_URL from '../../utils/apiConfig';
import { Box, Container, Grid, Typography, Paper, Button, IconButton, Divider, Stack, CircularProgress, Alert } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems, totalCartPrice, isLoading, error, cartId } = useSelector((state) => state.cartState);
    const { token } = useSelector((state) => state.authState);

    useEffect(() => {
        if (token) {
            dispatch(fetchCart());
        }
    }, [dispatch, token]);

    const handleRemove = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    const handleCheckout = () => {
        if (!cartId) return;
        
        // Direct call to creating session as per orderController
        fetch(`${API_URL}/orders/checkout-session/${cartId}`, {
           method: 'GET',
           headers: {
               Authorization: `Bearer ${token}`
           }
        })
        .then(res => res.json())
        .then(data => {
            if(data.session && data.session.url) {
                window.location.href = data.session.url;
            } else {
                 console.error("No session URL", data);
                 toast.error("Could not initiate checkout.");
            }
        })
        .catch(err => {
            console.error(err);
            toast.error("Checkout failed. Please try again.");
        });
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
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, fontFamily: 'inherit' }}>Shopping Cart</Typography>
                
                {(!cartItems || cartItems.length === 0) ? (
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
                             <ShoppingBagIcon sx={{ fontSize: 48 }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Your cart is empty</Typography>
                        <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                            Looks like you haven't added anything to your cart yet. Browse our categories to find amazing deals!
                        </Typography>
                        <Button 
                            component={Link} 
                            to="/" 
                            variant="contained" 
                            size="large"
                            sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
                        >
                            Start Shopping
                        </Button>
                    </Paper>
                ) : (
                    <Grid container spacing={4}>
                        {/* Cart Items List */}
                        <Grid item xs={12} lg={8}>
                            <Stack spacing={2}>
                                {cartItems.map((item) => (
                                    <Paper key={item._id} sx={{ p: 3, borderRadius: 3, display: 'flex', gap: 3, alignItems: 'flex-start', boxShadow: 1 }}>
                                        <Box sx={{ 
                                            width: { xs: 100, sm: 120 }, 
                                            height: { xs: 100, sm: 120 }, 
                                            flexShrink: 0, 
                                            border: 1, 
                                            borderColor: 'divider', 
                                            borderRadius: 2, 
                                            p: 1, 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center' 
                                        }}>
                                            <img 
                                                src={item.product?.imageCover?.startsWith('http') ? item.product.imageCover : `${API_URL}/products/${item.product.imageCover}`}
                                                alt={item.product?.title} 
                                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                            />
                                        </Box>
                                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: { sm: 120 }, justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5, lineHeight: 1.3 }}>
                                                    {item.product?.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    Color: <Box component="span" sx={{ color: 'text.primary', fontWeight: 500 }}>{item.color}</Box>
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <Typography variant="caption" color="text.secondary">Sold by</Typography>
                                                    <Typography variant="caption" sx={{ fontWeight: 700, bgcolor: 'action.hover', px: 1, py: 0.5, borderRadius: 1 }}>
                                                        {item.product?.brand?.name || 'Noon'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2, borderTop: 1, borderColor: 'divider', pt: 2 }}>
                                                <Button 
                                                    startIcon={<DeleteOutlineIcon />}
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleRemove(item._id)}
                                                    sx={{ textTransform: 'none' }}
                                                >
                                                    Remove
                                                </Button>
                                                
                                                <Box sx={{ textAlign: 'right' }}>
                                                     <Typography variant="caption" color="text.secondary" display="block">
                                                        {item.quantity} x {item.price}
                                                     </Typography>
                                                     <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                        {item.price * item.quantity} <Typography component="span" variant="caption" color="text.secondary">EGP</Typography>
                                                     </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Paper>
                                ))}
                            </Stack>
                        </Grid>
                        
                        {/* Order Summary */}
                        <Grid item xs={12} lg={4}>
                            <Paper sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 100, boxShadow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Order Summary</Typography>
                                
                                <Stack spacing={2} sx={{ mb: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
                                        <Typography>Subtotal ({cartItems.length} items)</Typography>
                                        <Typography fontWeight={500}>{totalCartPrice} EGP</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
                                        <Typography>Shipping</Typography>
                                        <Typography color="success.main" fontWeight={500}>Free</Typography>
                                    </Box>
                                </Stack>
                                
                                <Divider sx={{ mb: 3 }} />
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1 }}>{totalCartPrice}</Typography>
                                        <Typography variant="caption" color="text.secondary">EGP (Inclusive of VAT)</Typography>
                                    </Box>
                                </Box>
                                
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    size="large"
                                    onClick={handleCheckout}
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ py: 1.5, mb: 2, fontSize: '1rem', fontWeight: 700 }}
                                >
                                    Checkout
                                </Button>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, opacity: 0.6 }}>
                                    <CreditCardIcon />
                                    <Divider orientation="vertical" flexItem />
                                    <Typography variant="caption" color="text.secondary">Secure Checkout</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default Cart;
