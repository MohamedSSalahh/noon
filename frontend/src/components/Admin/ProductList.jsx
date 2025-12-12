import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from './AdminLayout';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../redux/slices/productSlice';
import { toast } from 'react-toastify';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.productState);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
                .unwrap()
                .then(() => toast.success('Product deleted successfully'))
                .catch((err) => toast.error(`Failed to delete product: ${err}`));
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-noon-black">Product Management</h1>
                <Link to="/admin/add-product" className="bg-noon-yellow text-noon-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors shadow-sm">
                    <i className="fas fa-plus mr-2"></i> Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                {isLoading ? (
                    <div className="p-8 text-center">Loading products...</div>
                ) : error ? ( 
                    <div className="p-8 text-center text-red-500">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 font-medium">Image</th>
                                    <th className="p-4 font-medium">Name</th>
                                    <th className="p-4 font-medium">Price</th>
                                    <th className="p-4 font-medium">Category</th>
                                    <th className="p-4 font-medium">Sold</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <img src={product.imageCover} alt={product.title} className="w-12 h-12 object-contain rounded-md border border-gray-200" />
                                        </td>
                                        <td className="p-4 font-medium text-noon-black max-w-xs truncate" title={product.title}>
                                            {product.title}
                                        </td>
                                        <td className="p-4 font-bold text-noon-black">
                                            {product.price} EGP
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {product.category?.name || 'N/A'}
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {product.sold}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors" title="Edit">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product._id)}
                                                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors" 
                                                title="Delete"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {!isLoading && products.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No products found.</div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ProductList;
