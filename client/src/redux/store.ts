import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/Cart/CartSlice';
import productReducer from './features/Products/ProductSlice';
import userReducer from './features/User/userSlice';
import { api } from './api/apiSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;

export default store;
