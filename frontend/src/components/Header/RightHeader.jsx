import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const RightHeader = () => {
    const { user } = useSelector((state) => state.authState);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        // FIXED WIDTH: Removed mobile fixed positioning, full width, and shadow.
        // The desktop classes (lg:static, lg:bg-transparent, lg:justify-end, lg:p-0, lg:shadow-none)
        // are now applied across all screen sizes by removing the 'lg:' prefix, 
        // or by keeping the default classes simple.
        <div className="flex items-center gap-1 lg:gap-2 shrink-0 bg-transparent justify-end p-0 shadow-none z-auto border-none">
            
            {/* Language */}
            <div className="hidden lg:flex items-center gap-1 cursor-pointer hover:bg-black/5 px-2 py-1 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95">
                <h3 className="text-xs font-bold font-heading">العربية</h3>
            </div>

            <span className="text-noon-black opacity-10 h-4 w-px bg-current hidden lg:block"></span>

            {/* Authentication + Admin */}
            {user ? (
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 cursor-pointer hover:bg-black/5 px-2 py-1 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95" onClick={handleLogout}>
                        <h3 className="text-xs font-bold hidden lg:block">Sign Out</h3>
                        <i className="fas fa-sign-out-alt text-lg lg:hidden"></i> 
                    </div>
                    {user.role === 'admin' && (
                         <Link to="/admin" className="flex items-center gap-1 cursor-pointer hover:bg-black/5 px-2 py-1 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95">
                             <h3 className="text-xs font-bold hidden lg:block">Admin</h3>
                             <i className="fas fa-shield-alt text-lg lg:hidden"></i>
                         </Link>
                    )}
                </div>
            ) : (
                <Link to="/login" className="flex items-center gap-2 cursor-pointer hover:bg-black/5 px-2 py-1 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95">
                    <h3 className="text-xs font-bold hidden lg:block">Sign In</h3>
                    <i className="fas fa-user text-lg text-noon-black"></i> 
                </Link>
            )}

            <span className="text-noon-black opacity-10 h-4 w-px bg-current hidden lg:block"></span>

            {user && user.role !== 'admin' && (
                <>
                     <Link to="/orders" className="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-black/5 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 group" title="My Orders">
                        <i className="fas fa-box text-lg text-noon-black/90 group-hover:text-noon-blue transition-colors"></i>
                    </Link>
                    <span className="text-noon-black opacity-10 h-4 w-px bg-current hidden lg:block"></span>
                </>
            )}

            {/* Cart & Wishlist - Hidden for Admin */}
            {(!user || user.role !== 'admin') && (
                <>
                    {/* Cart */}
                    <Link to="/cart" className="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-black/5 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 relative group">
                        <div className="relative">
                            <i className="fas fa-shopping-cart text-lg text-noon-black/90 group-hover:text-noon-blue transition-colors"></i>
                        </div>
                    </Link>

                    <span className="text-noon-black opacity-10 h-4 w-px bg-current hidden lg:block"></span>

                    {/* Wishlist */}
                    <Link to="/wishlist" className="flex items-center justify-center w-8 h-8 cursor-pointer hover:bg-black/5 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 group">
                        <i className="fas fa-heart text-lg text-noon-black/90 group-hover:text-noon-red transition-colors"></i>
                    </Link>
                </>
            )}

        </div>
    );
};

export default RightHeader;