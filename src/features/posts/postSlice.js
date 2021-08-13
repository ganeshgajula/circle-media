import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:4000/posts/${userId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (post, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/posts/${post.userId}`,
        { content: post.postContent }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const likeButtonPressed = createAsyncThunk(
  "posts/likeButtonPressed",
  async (postDetails, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/posts/${postDetails.postAuthorId}/${postDetails.postId}/likes`,
        { likedByUserId: postDetails.likedByUserId }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const retweetButtonPressed = createAsyncThunk(
  "posts/retweetButtonPressed",
  async (postDetails, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/posts/${postDetails.postAuthorId}/${postDetails.postId}/retweets`,
        { retweetedByUserId: postDetails.retweetedByUserId }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const bookmarkButtonPressed = createAsyncThunk(
  "posts/bookmarkButtonPressed",
  async (postDetails, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/posts/${postDetails.postAuthorId}/${postDetails.postId}/bookmarks`,
        { bookmarkedByUserId: postDetails.bookmarkedByUserId }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createNewReply = createAsyncThunk(
  "posts/createNewReply",
  async (reply, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/posts/${reply.postAuthorId}/${reply.postId}/replies`,
        { message: reply.content }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  posts: [],
  feed: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [loadPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts = action.payload.posts.posts;
    },
    [loadPosts.rejected]: (state) => {
      state.status = "rejected";
    },
    [createNewPost.pending]: (state) => {
      state.status = "loading";
      toast.info("post creation in progress.", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [createNewPost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts = action.payload.posts.posts;
      toast.success("post successful", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
      });
    },
    [createNewPost.rejected]: (state, action) => {
      state.status = "rejected";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [likeButtonPressed.fulfilled]: (state, action) => {
      state.posts = action.payload.posts.posts;
    },
    [likeButtonPressed.rejected]: (state, action) => {
      state.error = "error";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [retweetButtonPressed.fulfilled]: (state, action) => {
      state.posts = action.payload.posts.posts;
    },
    [retweetButtonPressed.rejected]: (state, action) => {
      state.error = "error";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [bookmarkButtonPressed.fulfilled]: (state, action) => {
      state.posts = action.payload.posts.posts;
    },
    [bookmarkButtonPressed.rejected]: (state, action) => {
      state.error = "error";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [createNewReply.fulfilled]: (state, action) => {
      state.posts = action.payload.posts.posts;
    },
    [createNewReply.rejected]: (state, action) => {
      state.error = "error";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
  },
});

export default postsSlice.reducer;
