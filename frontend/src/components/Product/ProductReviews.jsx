import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductReviews, createReview } from '../../redux/slices/reviewSlice';
import { toast } from 'react-toastify';

const ProductReviews = ({ productId }) => {
    const dispatch = useDispatch();
    const { reviews, isLoading } = useSelector((state) => state.reviewState);
    const { user } = useSelector((state) => state.authState);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ rating: 5, title: '', review: '' });

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductReviews(productId));
        }
    }, [productId, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please log in to write a review');
            return;
        }
        dispatch(createReview({ productId, ratings: formData.rating, title: formData.title, review: formData.review }))
            .unwrap()
            .then(() => {
                toast.success('Review submitted successfully!');
                setFormData({ rating: 5, title: '', review: '' });
                setShowForm(false);
            })
            .catch((err) => toast.error(err));
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <i key={i} className={`fas fa-star text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
        ));
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-noon-black">Customer Reviews</h2>
                {user && (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-noon-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        {showForm ? 'Cancel' : 'Write a Review'}
                    </button>
                )}
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-noon-black mb-2">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, rating: star })}
                                    className="text-2xl focus:outline-none"
                                >
                                    <i className={`fas fa-star ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-noon-black mb-2">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-noon-blue"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-noon-black mb-2">Review</label>
                        <textarea
                            value={formData.review}
                            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-noon-blue h-24"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-noon-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Submit Review
                    </button>
                </form>
            )}

            {isLoading ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-noon-blue mx-auto"></div>
                </div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No reviews yet. Be the first to review this product!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="border-b border-gray-200 pb-4 last:border-0">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        {renderStars(review.rating)}
                                        <span className="text-sm font-bold text-noon-black">{review.title}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        by {review.user?.name || 'Anonymous'} • {new Date(review.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700">{review.review}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
