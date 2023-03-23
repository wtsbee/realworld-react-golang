import { configureStore } from "@reduxjs/toolkit";
import login from "./loginSlice";

export const store = configureStore({
  reducer: { login },
});

export type RootState = ReturnType<typeof store.getState>;
