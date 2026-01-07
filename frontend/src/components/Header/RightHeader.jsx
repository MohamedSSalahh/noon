import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { Box, Button, IconButton, Divider, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; // Using native MUI icon instead of fontawesome if possible, or stick to FA if preferred. Sticking to FA as per user code, but wrapped in MUI.
// Actually, let's switch to MUI Icons for a more "MUI" feel
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

const RightHeader = () => {
    const { user } = useSelector((state) => state.authState);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const actionButtonStyle = {
        textTransform: 'none',
        color: 'text.primary',
        fontWeight: 700,
        fontSize: '0.75rem',
        padding: '6px 8px',
        minWidth: 'auto',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.05)',
        }
    };

    const iconButtonStyle = {
        padding: '8px',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            color: 'primary.main', // Noon blue previously, now primary yellow or stick to black
        },
        transition: 'transform 0.2s',
        '&:active': {
            transform: 'scale(0.95)'
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, lg: 2 }, justifyContent: 'flex-end' }}>
            
            {/* Language */}
            <Button 
                sx={{ 
                    ...actionButtonStyle, 
                    display: { xs: 'none', lg: 'flex' } 
                }}
            >
                العربية
            </Button>

            <Divider orientation="vertical" flexItem sx={{ height: 16, my: 'auto', display: { xs: 'none', lg: 'block' }, borderColor: 'rgba(0,0,0,0.1)' }} />

            {/* Authentication + Admin */}
            {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button 
                        onClick={handleLogout}
                        startIcon={<LogoutIcon sx={{ fontSize: 20 }} />}
                        sx={{ ...actionButtonStyle }}
                    >
                        <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }}>Sign Out</Box>
                    </Button>
                    
                    {user.role === 'admin' && (
                         <Button 
                            component={Link} 
                            to="/admin"
                            startIcon={<AdminPanelSettingsIcon sx={{ fontSize: 20 }} />}
                            sx={{ ...actionButtonStyle }}
                        >
                            <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }}>Admin</Box>
                        </Button>
                    )}
                </Box>
            ) : (
                <Button 
                    component={Link} 
                    to="/login"
                    startIcon={<PersonOutlineIcon sx={{ fontSize: 24 }} />}
                    sx={{ ...actionButtonStyle }}
                >
                    <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }}>Sign In</Box>
                </Button>
            )}

            <Divider orientation="vertical" flexItem sx={{ height: 16, my: 'auto', display: { xs: 'none', lg: 'block' }, borderColor: 'rgba(0,0,0,0.1)' }} />

            {user && user.role !== 'admin' && (
                <>
                     <IconButton 
                        component={Link} 
                        to="/orders" 
                        sx={iconButtonStyle}
                        title="My Orders"
                    >
                        <LocalMallOutlinedIcon sx={{ fontSize: 24, color: 'text.primary' }} />
                    </IconButton>
                    <Divider orientation="vertical" flexItem sx={{ height: 16, my: 'auto', display: { xs: 'none', lg: 'block' }, borderColor: 'rgba(0,0,0,0.1)' }} />
                </>
            )}

            {/* Cart & Wishlist - Hidden for Admin */}
            {(!user || user.role !== 'admin') && (
                <>
                    {/* Cart */}
                    <IconButton 
                        component={Link} 
                        to="/cart" 
                        sx={iconButtonStyle}
                    >
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 24, color: 'text.primary' }} />
                    </IconButton>

                    <Divider orientation="vertical" flexItem sx={{ height: 16, my: 'auto', display: { xs: 'none', lg: 'block' }, borderColor: 'rgba(0,0,0,0.1)' }} />

                    {/* Wishlist */}
                    <IconButton 
                        component={Link} 
                        to="/wishlist" 
                        sx={iconButtonStyle}
                    >
                        <FavoriteBorderIcon sx={{ fontSize: 24, color: 'text.primary' }} />
                    </IconButton>
                </>
            )}

        </Box>
    );
};

export default RightHeader;