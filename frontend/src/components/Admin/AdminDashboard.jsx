import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from './AdminLayout';
import { getCategories } from '../../apis/categories';
import { fetchProducts } from '../../redux/slices/productSlice';
import { getAllOrders } from '../../redux/slices/orderSlice';
import { fetchUsers } from '../../redux/slices/userSlice';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categoryState);
    const { products } = useSelector((state) => state.productState);
    const { orders } = useSelector((state) => state.orderState);
    const { users } = useSelector((state) => state.userState);

    useEffect(() => {
        dispatch(getCategories);
        dispatch(fetchProducts());
        dispatch(getAllOrders());
        dispatch(fetchUsers());
    }, [dispatch]);

    const stats = [
        { title: 'Total Sales', value: `${orders.reduce((acc, order) => acc + (order.totalOrderPrice || 0), 0).toFixed(2)} EGP`, icon: 'fa-coins', color: 'bg-green-500' },
        { title: 'Total Orders', value: orders.length, icon: 'fa-shopping-bag', color: 'bg-blue-500' },
        { title: 'Total Products', value: products.length, icon: 'fa-box-open', color: 'bg-orange-500' },
        { title: 'Total Users', value: users.length, icon: 'fa-users', color: 'bg-purple-500' },
    ];

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-noon-black">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Admin</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
                        <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md`}>
                            <i className={`fas ${stat.icon} text-lg`}></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{stat.title}</p>
                            <h3 className="text-xl font-bold text-noon-black">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Quick Actions could go here */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-noon-black mb-4">Recent Orders</h3>
                    {orders.length > 0 ? (
                        <div className="text-center py-4">
                            <p>Showing last {Math.min(5, orders.length)} orders</p>
                            {/* We could map recent orders here */}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <i className="fas fa-clipboard-list text-4xl mb-2"></i>
                            <p>No recent orders</p>
                        </div>
                    )}
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-noon-black mb-4">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <span key={cat._id} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                {cat.title}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
