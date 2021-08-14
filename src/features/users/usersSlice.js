import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const loadUsers = createAsyncThunk(
  "users/loadUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [loadUsers.pending]: (state) => {
      state.status = "loading";
    },
    [loadUsers.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.users = action.payload.users;
    },
    [loadUsers.rejected]: (state, action) => {
      state.error = "error";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
  },
});

export default usersSlice.reducer;
