import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialToken = localStorage.getItem("token");
const initialEmail = localStorage.getItem("email");
const userIsloggedin = !!initialToken;

const initialAuthState = {
  token: initialToken,
  email: initialEmail,
  isAuthenticated: userIsloggedin,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);

      axios
        .get(
          `https://expense-tracker-13ac1-default-rtdb.firebaseio.com/${action.payload.email}.json`
        )
        .then((response) => console.log(response.data))
        .catch((err) => {
          if (err.message === "Cannot convert undefined or null to object") {
            return;
          } else {
            alert(err.message);
          }
        });
    },

    logout(state) {
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
