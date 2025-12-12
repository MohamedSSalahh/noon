import React from "react";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
    }
  };
  return (
    <header className="bg-noon-yellow w-full sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1440px] mx-auto h-16 px-4 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
        <LeftHeader />
        <div className="flex-grow max-w-[800px] w-full hidden md:block">
             <div className="relative w-full">
                <form onSubmit={handleSearch}>
                    <input 
                        className="w-full h-10 px-4 pl-4 pr-12 border-none outline-none rounded-md text-sm text-noon-black bg-white placeholder-gray-400 focus:ring-0" 
                        type="text" 
                        name="search" 
                        placeholder="What are you looking for?" 
                        autoComplete="off" 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="absolute right-0 top-0 h-full px-4 text-noon-blue">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
             </div>
        </div>
        <RightHeader />
      </div>
      {/* Mobile Search Bar */}
      <div className="md:hidden bg-white p-3 shadow-sm">
         <div className="relative w-full">
            <form onSubmit={handleSearch}>
                <input 
                    className="w-full h-10 px-4 border border-noon-gray-200 outline-none rounded-lg text-sm text-noon-black bg-white placeholder-noon-gray-400" 
                    type="text" 
                    name="search" 
                    placeholder="What are you looking for?" 
                    autoComplete="off" 
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </form>
         </div>
      </div>
    </header>
  );
};

export default Header;
