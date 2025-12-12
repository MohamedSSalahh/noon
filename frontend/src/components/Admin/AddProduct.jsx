import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categorySlice';
import { createProduct } from '../../redux/slices/productSlice';
import AdminLayout from './AdminLayout';
import { toast } from 'react-toastify';
import { FiUploadCloud, FiX, FiCheck } from 'react-icons/fi';

const AddProduct = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categoryState);
    const { isLoading } = useSelector((state) => state.productState);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        imageCover: null
    });
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imageCover') {
            const file = files[0];
            if (file) {
                setFormData({ ...formData, imageCover: file });
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, imageCover: null });
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.imageCover) {
            toast.error("Please upload a product image");
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('quantity', formData.quantity);
        data.append('category', formData.category);
        data.append('imageCover', formData.imageCover);
        // slug is usually handled by backend, but if needed:
        // data.append('slug', formData.title.toLowerCase().replace(/ /g, '-')); 

        dispatch(createProduct(data))
            .unwrap()
            .then(() => {
                toast.success('Product added successfully!');
                setFormData({
                    title: '',
                    description: '',
                    price: '',
                    quantity: '',
                    category: '',
                    imageCover: null
                });
                setPreview(null);
            })
            .catch((err) => {
                toast.error(typeof err === 'string' ? err : 'Failed to add product');
                console.error(err);
            });
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Product</h1>
                        <p className="text-gray-500 mt-1">Create a new item for your inventory</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {/* Basic Info Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-noon-yellow/50 focus:border-noon-yellow transition-all outline-none"
                                        placeholder="e.g. Apple iPhone 14 Pro Max"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-noon-yellow/50 focus:border-noon-yellow transition-all outline-none resize-none"
                                        placeholder="Detailed description of the product..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Category Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Pricing & Organization</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (EGP)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3 text-gray-500">EGP</span>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                            min="0"
                                            className="w-full pl-14 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-noon-yellow/50 focus:border-noon-yellow transition-all outline-none"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-noon-yellow/50 focus:border-noon-yellow transition-all outline-none"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-noon-yellow/50 focus:border-noon-yellow transition-all outline-none bg-white appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Category</option>
                                        {categories && categories.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Media Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Media</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                                {!preview ? (
                                    <div className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <div className="space-y-2 text-center">
                                            <div className="mx-auto h-12 w-12 text-gray-400 group-hover:text-noon-yellow transition-colors">
                                                <FiUploadCloud size={48} />
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-noon-yellow hover:text-yellow-600 focus-within:outline-none">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="imageCover" type="file" className="sr-only" onChange={handleChange} accept="image/*" />
                                                </label>
                                                <p className="pl-1 inline">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden group">
                                        <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <FiX size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-100">
                           <button
                                type="button"
                                onClick={() => setFormData({ title: '', description: '', price: '', quantity: '', category: '', imageCover: null })}
                                className="px-6 py-3 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="px-8 py-3 bg-noon-yellow text-black font-bold rounded-lg hover:bg-yellow-400 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiCheck size={20} />
                                        <span>Create Product</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddProduct;
