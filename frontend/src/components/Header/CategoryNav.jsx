import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchCategories } from "../../redux/slices/categorySlice";

const CategoryNav = () => {
    const { categories } = useSelector((state) => state.categoryState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="bg-white border-b border-gray-100 w-full block md:sticky md:top-16 z-40 transition-all duration-300 shadow-sm">
            <div className="max-w-[1440px] mx-auto px-4 relative">
                <ul className="flex items-center list-none h-12 gap-4 px-2 lg:px-0">
                    {/* ALL CATEGORIES DROPDOWN */}
                    <li className="group font-bold text-[13px] text-noon-blue cursor-pointer flex items-center h-full relative z-50">
                        <Link to="/" className="flex items-center h-full pr-4 lg:border-r border-gray-200 hover:text-noon-blue/80 transition-colors">
                            ALL CATEGORIES
                            <i className="fas fa-chevron-down ml-2 text-[10px] transition-transform duration-300 group-hover:-rotate-180"></i>
                        </Link>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 w-64 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-b-lg border-x border-b border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out py-2 z-50">
                            <ul className="flex flex-col max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                {categories && categories.map((category) => (
                                    <Link 
                                        key={category._id || category.id} 
                                        to={`/${category.title || category.name}`}
                                        className="px-6 py-2.5 hover:bg-gray-50 transition-colors flex items-center justify-between group/item text-decoration-none"
                                    >
                                        <span className="text-sm font-medium text-gray-700 group-hover/item:text-noon-blue capitalize">
                                            {(category.title || category.name || '').toLowerCase()}
                                        </span>
                                        <i className="fas fa-chevron-right text-[10px] text-gray-300 group-hover/item:text-noon-blue"></i>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </li>

                    {/* Horizontal Scrollable List */}
                    <div className="flex-1 overflow-x-auto scrollbar-hide flex items-center gap-6 h-full mask-linear-fade">
                        {categories && categories.map((category) => (
                            <Link 
                                key={`nav-${category._id || category.id}`}
                                to={`/${category.title || category.name}`}
                                className="text-[13px] font-bold text-gray-600 cursor-pointer whitespace-nowrap uppercase transition-colors duration-200 shrink-0 hover:text-noon-blue flex items-center h-full"
                            >
                                {(category.title || category.name || '').toUpperCase()}
                            </Link>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default CategoryNav;
