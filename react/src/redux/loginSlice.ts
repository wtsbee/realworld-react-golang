import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  user: {
    email: string;
    password: string;
  };
  loginIn: boolean;
}

const initialState: LoginState = {
  user: {
    email: "",
    password: "",
  },
  loginIn: false,
};

export const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    startLoginIn: (state) => {
      state.loginIn = true;
    },
  },
});

export const { startLoginIn } = slice.actions;

export default slice.reducer;
