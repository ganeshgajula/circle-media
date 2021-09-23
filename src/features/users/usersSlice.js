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

export const followUnfollowUser = createAsyncThunk(
  "users/followUnfollowUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/users/${userData.username}/followunfollow`,
        { userId: userData.currentLoggedInUserId }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "users/editUserProfile",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/users/${userData.username}`,
        {
          firstname: userData.firstname,
          lastname: userData.lastname,
          bio: userData.bio,
          link: userData.link,
          location: userData.location,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const pushNotification = createAsyncThunk(
  "notification/pushNotification",
  async ({ username, originatorUserId, type, postId }, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/users/${username}/notifications`,
        { originatorUserId, type, postId }
      );
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
  selectedUser: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getSelectedUser: (state, action) => {
      const selectedUser = state.users.find(
        (user) => user.username === action.payload
      );
      state.selectedUser = selectedUser;
    },
  },
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
    [followUnfollowUser.fulfilled]: (state, action) => {
      const followedOrUnfollowedToUserIndex = state.users.findIndex(
        (user) => String(user._id) === String(action.payload.followedToUser._id)
      );

      if (followedOrUnfollowedToUserIndex !== -1) {
        state.users[followedOrUnfollowedToUserIndex] =
          action.payload.followedToUser;
      }

      const followedOrUnfollowedByUserIndex = state.users.findIndex(
        (user) => String(user._id) === String(action.payload.followedByUser._id)
      );

      if (followedOrUnfollowedByUserIndex !== -1) {
        state.users[followedOrUnfollowedByUserIndex] =
          action.payload.followedByUser;
      }
    },
    [followUnfollowUser.rejected]: (state, action) => {
      state.error = "error";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [editUserProfile.pending]: (state) => {
      state.status = "loading";
      toast.info("Updating user info..", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [editUserProfile.fulfilled]: (state, action) => {
      state.status = "fulfilled";

      const userIndex = state.users.findIndex(
        (user) => user._id === action.payload.updatedUser._id
      );

      if (userIndex !== -1) {
        state.users.splice(userIndex, 1);
        state.users.push(action.payload.updatedUser);
      }

      toast.success("Profile updated successfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [editUserProfile.rejected]: (state, action) => {
      state.error = "error";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [pushNotification.fulfilled]: (state, action) => {
      const toBeNotifiedUserIndex = state.users.findIndex(
        (user) => String(user._id) === action.payload.user._id
      );

      if (toBeNotifiedUserIndex !== -1) {
        state.users[toBeNotifiedUserIndex] = action.payload.user;
      }
    },
    [pushNotification.rejected]: (state, action) => {
      state.error = "error";
      toast.error(action.payload.errorMessage, {
        position: "bottom-center",
        autoClose: 2000,
      });
    },
  },
});

export const { getSelectedUser } = usersSlice.actions;

export default usersSlice.reducer;
