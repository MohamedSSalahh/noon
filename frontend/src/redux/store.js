import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './slices/categorySlice';
import collectionReducer from './slices/collectionSlice';
import locationReducer from './slices/locationSlice';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import wishListReducer from './slices/wishListSlice';
import reviewReducer from './slices/reviewSlice';
import brandReducer from './slices/brandSlice';
import addressReducer from './slices/addressSlice';

import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        categoryState: categoryReducer,
        collectionState: collectionReducer,
        locationState: locationReducer,
        authState: authReducer,
        chatState: chatReducer,
        productState: productReducer,
        cartState: cartReducer,
        orderState: orderReducer,
        wishListState: wishListReducer,
        reviewState: reviewReducer,
        brandState: brandReducer,
        addressState: addressReducer,
        userState: userReducer,
      },
});