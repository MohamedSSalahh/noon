import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import API_URL from '../../utils/apiConfig';

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center bg-white p-10 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full">
                {processing ? (
                    <>
                         <div className="w-16 h-16 border-4 border-noon-yellow border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                         <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Payment...</h2>
                         <p className="text-gray-500">Please wait while we confirm your order.</p>
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-exclamation-triangle text-2xl"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Verification Failed</h2>
                        <p className="text-gray-500 mb-6">We couldn't confirm your payment. If you were charged, please contact support.</p>
                        <button 
                            onClick={() => navigate('/cart')}
                            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Return to Cart
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default OrderSuccess;
