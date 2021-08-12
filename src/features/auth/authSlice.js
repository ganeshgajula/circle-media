import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userCredentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/users/signup",
        userCredentials
      );
      return response.data.savedUser;
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
        url: "http://localhost:4000/users/authenticate",
        headers: userCredentials,
      });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const initializeUser = createAsyncThunk("auth/initializeUser",async(email,thunkAPI) => {
  try{
    const response = await axios.get(`http://localhost:4000/users/${email}/user`);
    return response.data;
  }catch(error){
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

const initialState = {
  isUserLoggedIn: false,
  status: "idle",
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout:(state) => {
      state.currentUser=null;
      localStorage?.removeItem("userCredentials");
      state.isUserLoggedIn=false;
      state.status="idle";
    }
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
      state.isUserLoggedIn = true;
      state.currentUser = action.payload;
      toast.success("Login successful", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2200,
      });
      localStorage?.setItem(
        "userCredentials",
        JSON.stringify({
          userId: action.payload._id,
          username: action.payload.username,
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          email:action.payload.email,
          isUserLoggedIn:true,
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
    [initializeUser.fulfilled]: (state,action) => {
      state.currentUser = action.payload.user;
      state.isUserLoggedIn = true;
    }
  },
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;
