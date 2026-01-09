import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const VendorDashboard = () => {
    const { user } = useSelector((state) => state.authState);

    if (!user || user.role !== 'vendor') {
        return <div className="p-10 text-center">Access Denied. Vendors Only.</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-2">Welcome, {user.name}</h2>
                <p className="text-gray-600">
                   Status: <span className={`font-bold ${user.isVerifiedVendor ? 'text-green-600' : 'text-yellow-600'}`}>
                       {user.isVerifiedVendor ? 'Verified' : 'Pending Verification'}
                   </span>
                </p>
                {!user.isVerifiedVendor && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
                        Please wait for an administrator to verify your vendor account before you can start selling.
                    </div>
                )}
            </div>

            {user.isVerifiedVendor && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Quick Actions */}
                    <Link to="/admin/add-product" className="block p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
                        <h3 className="text-lg font-bold text-blue-800">Add New Product</h3>
                        <p className="text-sm text-blue-600">List items for sale</p>
                    </Link>

                    <Link to="/admin/products" className="block p-6 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition">
                        <h3 className="text-lg font-bold text-purple-800">My Products</h3>
                        <p className="text-sm text-purple-600">Manage your inventory</p>
                    </Link>

                    <Link to="/admin/orders" className="block p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition">
                        <h3 className="text-lg font-bold text-green-800">My Orders</h3>
                        <p className="text-sm text-green-600">View customer orders</p>
                    </Link>
                </div>
            )}
            
            {/* Note: We are reusing '/admin' routes for now as per "reuse existing components" strategy, 
                but backend middleware will handle the scoping so they only see their own data. 
                Ideally, we would create /vendor/products etc, but reusing /admin/products works if the component accepts data from API 
                and the API filters by user (which we did in middleware).
            */}
        </div>
    );
};

export default VendorDashboard;
