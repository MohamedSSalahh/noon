import React from 'react';


const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-12 pb-6 mt-auto">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
                <div className="space-y-4">
                    <h3 className="font-bold text-noon-black text-sm uppercase tracking-wide">We're Always Here To Help</h3>
                    <ul className="space-y-2 text-sm text-noon-gray-500">
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Help Center</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Contact Us</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-noon-black text-sm uppercase tracking-wide">Electronics</h3>
                    <ul className="space-y-2 text-sm text-noon-gray-500">
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Mobiles</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Tablets</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Laptops</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Home Appliances</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-noon-black text-sm uppercase tracking-wide">Fashion</h3>
                    <ul className="space-y-2 text-sm text-noon-gray-500">
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Women's Fashion</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Men's Fashion</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Girls' Fashion</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Boys' Fashion</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-noon-black text-sm uppercase tracking-wide">Home and Kitchen</h3>
                    <ul className="space-y-2 text-sm text-noon-gray-500">
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Kitchen & Dining</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Furniture</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Home Decor</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Bedding & Bath</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-noon-black text-sm uppercase tracking-wide">Beauty</h3>
                    <ul className="space-y-2 text-sm text-noon-gray-500">
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Fragrance</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Make-Up</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Haircare</li>
                        <li className="hover:text-noon-black cursor-pointer transition-colors">Skincare</li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-noon-black text-sm mb-2">Connect with us</h3>
                        <div className="flex items-center gap-4">
                            <i className="fab fa-facebook-f text-xl text-noon-gray-500 hover:text-noon-blue cursor-pointer transition-colors"></i>
                            <i className="fab fa-twitter text-xl text-noon-gray-500 hover:text-noon-blue cursor-pointer transition-colors"></i>
                            <i className="fab fa-instagram text-xl text-noon-gray-500 hover:text-noon-blue cursor-pointer transition-colors"></i>
                            <i className="fab fa-linkedin-in text-xl text-noon-gray-500 hover:text-noon-blue cursor-pointer transition-colors"></i>
                        </div>
                    </div>
                </div>
                
                <div className="text-sm text-noon-gray-500">
                    <p>© 2023 Noon E-Commerce. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;