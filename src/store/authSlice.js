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
      console.log("Setting user:", action.payload);
      state.user = action.payload.user || null;
      state.isAuthenticated = !!action.payload.user;
      state.loading = false;
    },
    setTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUser: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get("/api/v1/auth/me");
    dispatch(setUser({ user: response.data }));
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    dispatch(setError("Failed to fetch user data"));
  }
};

export const { setLoading, setUser, setTokens, setError, logoutUser } =
  authSlice.actions;

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
    const response = await axios.post("/api/v1/auth/login", credentials);
    const { user, accessToken, refreshToken } = response.data;

    dispatch(setUser({ user }));
    dispatch(setTokens({ accessToken, refreshToken }));
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
