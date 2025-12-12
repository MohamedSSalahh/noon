import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, deleteCategory } from '../../redux/slices/categorySlice';
import AdminLayout from './AdminLayout';
import { toast } from 'react-toastify';

const CategoryList = () => {
    const dispatch = useDispatch();
    const { categories, isLoading, error } = useSelector((state) => state.categoryState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;

        dispatch(createCategory({ name: newCategoryName }))
            .unwrap()
            .then(() => {
                toast.success('Category created successfully');
                setNewCategoryName('');
                setIsModalOpen(false);
            })
            .catch((err) => toast.error(err || 'Failed to create category'));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            dispatch(deleteCategory(id))
                .unwrap()
                .then(() => toast.success('Category deleted successfully'))
                .catch((err) => toast.error(err || 'Failed to delete category'));
        }
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-noon-black">Category Management</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-noon-yellow text-noon-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors shadow-sm"
                >
                    <i className="fas fa-plus mr-2"></i> Add Category
                </button>
            </div>

            {/* Create Category Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
                        <form onSubmit={handleCreate}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-noon-yellow focus:border-transparent outline-none"
                                    placeholder="Enter category name"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-noon-yellow text-noon-black rounded-lg font-bold hover:bg-yellow-400"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                {isLoading ? (
                    <div className="p-8 text-center">Loading categories...</div>
                ) : error ? (
                    <div className="p-8 text-center text-red-500">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider">
                                <tr>
                                    <th className="p-4 font-medium">Name</th>
                                    <th className="p-4 font-medium">Slug</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {categories.map((cat) => (
                                    <tr key={cat._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-noon-black">
                                            {cat.title || cat.name}
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {cat.slug}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => handleDelete(cat._id)}
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
                 {!isLoading && categories.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No categories found.</div>
                )}
            </div>
        </AdminLayout>
    );
};

export default CategoryList;
