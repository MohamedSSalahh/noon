import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeSelectedCategory } from "../../redux/slices/categorySlice";

const CategoryOverview = () => {
    const selectedCategory = useSelector(({ categoryState }) => categoryState.selectedCategory);
    const dispatch = useDispatch();
    const categoryOverviewElement = useRef();


    const displaySubCategories = () => {
        if (selectedCategory.id) {
            let subCategoriesObj = selectedCategory.__collections__.subCategories;
            return Object.keys(subCategoriesObj).map(subKey => <li key={subKey} className="my-1 text-sm font-light whitespace-nowrap cursor-pointer hover:text-noon-blue">{subCategoriesObj[subKey].title}</li>);
        } 
    }

    const displayTopBrands = () => {
        if (selectedCategory.id) {
            let brandsObj = selectedCategory.__collections__.brands;
            return Object.keys(brandsObj).map(brandKey => <img key={brandKey} className="w-[180px] h-[100px] m-[5px_5px_5px_0] border border-gray-300 rounded cursor-pointer" src={brandsObj[brandKey].img} alt={brandsObj[brandKey].name} />);
        }
    }

    const displayPhotos = () => {
        if (selectedCategory.photos) return (
            <>
                <img className="w-[400px] mr-[15px] object-cover hidden xl:block" src={selectedCategory.photos[0]} alt="Category" />
                <img className="w-[200px] object-cover hidden xl:block" src={selectedCategory.photos[1]} alt="Category" />
            </>
        );
    }

    const handleOnMouseLeave = () => {
        let elementsMouseOver = document.querySelectorAll(":hover" )
        let elementsArray = [...elementsMouseOver];
        let currentMouseOverElement = elementsArray.at(-1);

        if (currentMouseOverElement !== categoryOverviewElement.current) {
            dispatch(removeSelectedCategory());
        }
    }

    return (
        <div className="absolute top-[110px] left-0 right-0 bottom-0 bg-black/50 pointer-events-auto z-[9]"
            style={selectedCategory.id ? { display: 'flex' } : { display: 'none' }}
        >
            <div ref={categoryOverviewElement}
                id="category-overview-element"
                className="w-full min-h-[50vh] p-5 absolute top-0 bg-white flex justify-between gap-1"
                onMouseLeave={handleOnMouseLeave}
            >
                <div className="w-[200px] mt-4">
                    <h5 className="font-bold mb-4">CATEGORIES</h5>
                    <ul className="list-none">
                        { displaySubCategories() }
                    </ul>
                </div>
                <div className="w-[30%] mr-[100px] xl:mr-[160px]">
                    <h5 className="font-bold mb-4 w-fit">TOP BRANDS</h5>
                    <div className="w-[600px]">
                        { displayTopBrands() }
                    </div>
                </div>
                <div className="mt-10">
                    <div className="flex">
                        { displayPhotos() }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryOverview;
