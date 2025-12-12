import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/slices/brandSlice';

const BrandsSection = () => {
    const dispatch = useDispatch();
    const { brands, isLoading } = useSelector((state) => state.brandState);

    useEffect(() => {
        dispatch(fetchBrands());
    }, [dispatch]);

    if (isLoading) return null;
    if (!brands || brands.length === 0) return null;

    return (
        <div className="bg-white py-8 my-6">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                <h3 className="text-xl font-bold text-noon-black mb-6">Shop By Brand</h3>
                <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                    {brands.map((brand) => (
                        <div key={brand._id} className="flex-shrink-0 flex flex-col items-center group cursor-pointer w-24 sm:w-32">
                            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center p-4 group-hover:shadow-md transition-shadow overflow-hidden">
                                <img 
                                    src={brand.image} 
                                    alt={brand.name} 
                                    className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
                                />
                            </div>
                            <p className="mt-3 text-sm font-medium text-gray-700 group-hover:text-noon-blue text-center truncate w-full">{brand.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandsSection;
