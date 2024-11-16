import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setUser, setError } = authSlice.actions;

export const signup = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.post("/api/v1/users/register", userData);
    dispatch(login(userData)); // Automatically log in after signup
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Signup failed"));
  }
};

export const login = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post("/api/v1/users/login", credentials);
    dispatch(setUser(response.data.user));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Login failed"));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("/api/v1/users/logout");
    dispatch(setUser(null));
  } catch (error) {
    console.error(error);
    dispatch(setError("Logout failed"));
  }
};

export default authSlice.reducer;
