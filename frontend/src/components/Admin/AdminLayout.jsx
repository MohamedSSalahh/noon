import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { path: '/admin', icon: 'fa-chart-line', label: 'Dashboard' },
        { path: '/admin/categories', icon: 'fa-layer-group', label: 'Categories' },
        { path: '/admin/products', icon: 'fa-box', label: 'Products' },
        { path: '/admin/add-product', icon: 'fa-plus-circle', label: 'Add Product' },
        { path: '/admin/orders', icon: 'fa-shopping-cart', label: 'Orders' },
        { path: '/admin/users', icon: 'fa-users', label: 'Users' },
        { path: '/admin/chat', icon: 'fa-comments', label: 'Support Chat' },
    ];

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="min-h-full bg-gray-100 flex">
            {/* Sidebar */}
            <aside className={`bg-noon-black text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col fixed h-full z-20`}>
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
                    {isSidebarOpen && <span className="font-bold text-xl text-noon-yellow">NOON ADMIN</span>}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-white">
                        <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-bars'}`}></i>
                    </button>
                </div>

                <nav className="flex-1 py-6 overflow-y-auto">
                    <ul className="space-y-2 px-2">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link 
                                    to={item.path} 
                                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                                        location.pathname === item.path 
                                            ? 'bg-noon-yellow text-noon-black font-bold' 
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    <i className={`fas ${item.icon} w-6 text-center`}></i>
                                    {isSidebarOpen && <span>{item.label}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button 
                        onClick={handleLogout}
                        className={`flex items-center gap-4 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors ${!isSidebarOpen && 'justify-center'}`}
                    >
                        <i className="fas fa-sign-out-alt w-6 text-center"></i>
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
