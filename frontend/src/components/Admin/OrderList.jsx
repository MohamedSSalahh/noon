import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from './AdminLayout';
import { getAllOrders, updateOrderToDelivered, updateOrderToPaid } from '../../redux/slices/orderSlice';
import { toast } from 'react-toastify';

const OrderList = () => {
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector((state) => state.orderState);

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const handleDeliver = (id) => {
        dispatch(updateOrderToDelivered(id))
            .unwrap()
            .then(() => toast.success('Order marked as delivered'))
            .catch((err) => toast.error(`Failed to update order: ${err}`));
    };

    const handlePay = (id) => {
        dispatch(updateOrderToPaid(id))
            .unwrap()
            .then(() => toast.success('Order marked as paid'))
            .catch((err) => toast.error(`Failed to update order: ${err}`));
    };

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-noon-black">Order Management</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                {isLoading ? (
                    <div className="p-8 text-center">Loading orders...</div>
                ) : error ? (
                    <div className="p-8 text-center text-red-500">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 font-medium">Order ID</th>
                                    <th className="p-4 font-medium">User</th>
                                    <th className="p-4 font-medium">Total Price</th>
                                    <th className="p-4 font-medium">Paid</th>
                                    <th className="p-4 font-medium">Delivered</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-mono text-xs text-gray-500">
                                            {order._id}
                                        </td>
                                        <td className="p-4 font-medium text-noon-black">
                                            {order.user?.name || 'Unknown User'}
                                            <div className="text-xs text-gray-400">{order.user?.email}</div>
                                        </td>
                                        <td className="p-4 font-bold text-noon-black">
                                            {order.totalOrderPrice} EGP
                                        </td>
                                        <td className="p-4">
                                            {order.isPaid ? (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Paid</span>
                                            ) : (
                                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">Not Paid</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {order.isDelivered ? (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Delivered</span>
                                            ) : (
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Pending</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            {!order.isPaid && (
                                                <button 
                                                    onClick={() => handlePay(order._id)}
                                                    className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md text-xs transition-colors"
                                                >
                                                    Mark Paid
                                                </button>
                                            )}
                                            {!order.isDelivered && (
                                                <button 
                                                    onClick={() => handleDeliver(order._id)}
                                                    className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md text-xs transition-colors"
                                                >
                                                    Mark Delivered
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {!isLoading && orders.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No orders found.</div>
                )}
            </div>
        </AdminLayout>
    );
};

export default OrderList;
