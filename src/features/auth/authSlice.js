import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://api-circlemedia.herokuapp.com/users/signup",
        userCredentials
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, thunkAPI) => {
    try {
      const response = await axios({
        method: "POST",
        url: "https://api-circlemedia.herokuapp.com/users/authenticate",
        headers: userCredentials,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const initializeUser = createAsyncThunk(
  "auth/initializeUser",
  async (username, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api-circlemedia.herokuapp.com/users/${username}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const setupAuthHeaderForServiceCalls = (token) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

const { token: savedToken, username: savedUsername } = JSON.parse(
  localStorage.getItem("userCredentials")
) || { token: null, username: null };

const initialState = {
  status: "idle",
  token: savedToken,
  username: savedUsername,
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.currentUser = null;
      state.status = "idle";
      setupAuthHeaderForServiceCalls(null);
      localStorage?.removeItem("userCredentials");
    },
  },
  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.status = "loading";
    },
    [signUpUser.fulfilled]: (state) => {
      state.status = "fulfilled";
      toast.success("Signup successful! Kindly login with given credentials", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
      });
    },
    [signUpUser.rejected]: (state, action) => {
      state.status = "rejected";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
      });
    },
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.token = action.payload.token;
      state.username = action.payload.user.username;
      state.currentUser = action.payload.user;
      setupAuthHeaderForServiceCalls(action.payload.token);
      toast.success("Login successful", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2200,
      });
      localStorage?.setItem(
        "userCredentials",
        JSON.stringify({
          token: action.payload.token,
          username: action.payload.user.username,
        })
      );
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "rejected";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2200,
      });
    },
    [initializeUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user;
      setupAuthHeaderForServiceCalls(state.token);
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
