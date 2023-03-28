import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  user: {
    username: string;
    email: string;
  };
  loginIn: boolean;
}

const initialState: LoginState = {
  user: {
    username: "",
    email: "",
  },
  loginIn: false,
};

export const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    startLoginIn: (state, { payload }) => {
      const {
        user: { username, email },
      } = payload;
      state.loginIn = true;
      state.user = {
        username,
        email,
      };
    },
  },
});

export const { startLoginIn } = slice.actions;

export default slice.reducer;
