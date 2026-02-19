import UserSlice from "@store/slices/User";
import ProductsSlice from "@store/slices/Products";
import ApplicationSlice from "@store/slices/Application";
import NotificationSlice from "@store/slices/Notifications";
import { configureStore, Middleware } from "@reduxjs/toolkit";
import { productsApi } from "./api/Products";

const store = configureStore({
    reducer: {
        application: ApplicationSlice,
        notifications: NotificationSlice,
        user: UserSlice,
        products: ProductsSlice,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            productsApi.middleware as Middleware,
        ),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TApplicationDispatch = typeof store.dispatch;

export default store;
