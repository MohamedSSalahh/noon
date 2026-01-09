import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_URL from '../../utils/apiConfig';
import { Box, Paper, Typography, CircularProgress, Button, Stack } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const OrderSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const sessionId = searchParams.get('session_id');
    const { token } = useSelector((state) => state.authState);
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        if (!sessionId || !token) {
            navigate('/');
            return;
        }

        const verifyOrder = async () => {
            try {
                const response = await fetch(`${API_URL}/orders/checkout-success`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ session_id: sessionId })
                });

                const data = await response.json();

                if (response.ok) {
                    toast.success("Order placed successfully!");
                    // Delay slightly to let user see success message
                    setTimeout(() => {
                        navigate('/orders');
                    }, 2000);
                } else {
                    toast.error(data.message || "Failed to process order");
                    setProcessing(false);
                }
            } catch (error) {
                console.error("Order verification error:", error);
                toast.error("Something went wrong verifying your payment.");
                setProcessing(false);
            }
        };

        verifyOrder();
    }, [sessionId, token, navigate]);

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', px: 2 }}>
            <Paper sx={{ textAlign: 'center', p: 5, borderRadius: 3, boxShadow: 3, maxWidth: 400, width: '100%' }}>
                {processing ? (
                    <>
                         <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
                         <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>Processing Payment...</Typography>
                         <Typography color="text.secondary">Please wait while we confirm your order.</Typography>
                    </>
                ) : (
                    <>
                        <Box sx={{ 
                            width: 64, 
                            height: 64, 
                            bgcolor: 'error.light', 
                            color: 'error.main', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            mx: 'auto', 
                            mb: 3 
                        }}>
                            <WarningAmberIcon sx={{ fontSize: 32 }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>Payment Verification Failed</Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>We couldn't confirm your payment. If you were charged, please contact support.</Typography>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => navigate('/cart')}
                            sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                        >
                            Return to Cart
                        </Button>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default OrderSuccess;
