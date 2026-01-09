import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import API_URL from '../../utils/apiConfig';
import { Box, Container, Stack, Paper, Typography, Chip, Divider, CircularProgress, Button } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state) => state.authState);

    useEffect(() => {
        if (token) {
            fetch(`${API_URL}/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(data => {
                setOrders(data.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
        }
    }, [token]);

    if (loading) return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
            <CircularProgress color="primary" />
        </Box>
    );

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="xl" sx={{ px: { xs: 2, lg: 4 } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, fontFamily: 'inherit' }}>My Orders</Typography>
                
                {orders.length === 0 ? (
                    <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 3, bgcolor: 'background.paper', boxShadow: 1 }}>
                        <Box sx={{ 
                            width: 80, 
                            height: 80, 
                            bgcolor: 'action.hover', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            mx: 'auto', 
                            mb: 3,
                            color: 'text.secondary'
                        }}>
                             <Inventory2Icon sx={{ fontSize: 40 }} />
                        </Box>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>You have no orders yet.</Typography>
                        <Button 
                            component={Link} 
                            to="/" 
                            variant="text" 
                            color="primary"
                            sx={{ fontWeight: 700 }}
                        >
                            Start Shopping
                        </Button>
                    </Paper>
                ) : (
                    <Stack spacing={3}>
                        {orders.map(order => (
                            <Paper key={order._id} sx={{ p: 3, borderRadius: 3, boxShadow: 1, border: 1, borderColor: 'divider' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                            Order ID: <Box component="span" sx={{ color: 'text.primary', fontFamily: 'monospace', fontWeight: 700 }}>#{order._id}</Box>
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1, mb: 0.5 }}>
                                            {order.totalOrderPrice} <Typography component="span" variant="caption" color="text.secondary">EGP</Typography>
                                        </Typography>
                                        <Chip 
                                            label={order.isPaid ? 'Paid' : 'Pending Payment'} 
                                            color={order.isPaid ? 'success' : 'warning'} 
                                            size="small" 
                                            sx={{ fontWeight: 600, borderRadius: 1, height: 24 }}
                                        />
                                    </Box>
                                </Box>
                                
                                <Divider sx={{ mb: 2 }} />
                                
                                <Stack spacing={2}>
                                     {order.cartItems.map((item, idx) => (
                                         <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                             <Box sx={{ 
                                                 width: 50, 
                                                 height: 50, 
                                                 bgcolor: 'background.default', 
                                                 borderRadius: 1, 
                                                 display: 'flex', 
                                                 alignItems: 'center', 
                                                 justifyContent: 'center', 
                                                 color: 'text.secondary',
                                                 flexShrink: 0
                                             }}>
                                                <Inventory2Icon fontSize="small" />
                                             </Box>
                                             <Box>
                                                 <Typography variant="subtitle2" sx={{ lineHeight: 1.2, mb: 0.5 }}>
                                                     {item.product?.title || "Product details unavailable"}
                                                 </Typography>
                                                 <Typography variant="caption" color="text.secondary">
                                                     Qty: {item.quantity}
                                                 </Typography>
                                             </Box>
                                         </Box>
                                     ))}
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                )}
            </Container>
        </Box>
    );
};

export default Orders;
