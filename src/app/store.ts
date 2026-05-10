import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/model/authSlice";
import menuReducer from "@/features/menu/model/menuSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menus: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
