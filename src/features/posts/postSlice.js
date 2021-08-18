import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const loadAllPosts = createAsyncThunk(
  "posts/loadAllPosts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:4000/posts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loadUserPosts = createAsyncThunk(
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

export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (postDetails, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/posts/${postDetails.postAuthorId}/${postDetails.postId}`
      );
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
        { replierId: reply.replierId, message: reply.content }
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
  requestedPost: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.status = "idle";
      state.posts = [];
      state.error = null;
      state.requestedPost = null;
    },
  },
  extraReducers: {
    [loadAllPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadAllPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts = action.payload.posts;
    },
    [loadAllPosts.rejected]: (state, action) => {
      state.error = "error";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [loadUserPosts.pending]: (state) => {
      state.status = "loading";
    },
    [loadUserPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts = action.payload.posts;
    },
    [loadUserPosts.rejected]: (state) => {
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
    [getSinglePost.pending]: (state) => {
      state.status = "loading";
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.requestedPost = action.payload.post;
    },
    [getSinglePost.rejected]: (state, action) => {
      state.error = "error";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [likeButtonPressed.fulfilled]: (state, action) => {
      const likedPostIndex = state.posts.findIndex(
        (post) => post._id === action.payload.likedPost._id
      );

      if (likedPostIndex !== -1) {
        state.posts.splice(likedPostIndex, 1);
        state.posts.push(action.payload.likedPost);
      }
    },
    [likeButtonPressed.rejected]: (state, action) => {
      state.error = "error";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [retweetButtonPressed.fulfilled]: (state, action) => {
      const retweetedPostIndex = state.posts.findIndex(
        (post) => post._id === action.payload.retweetedPost._id
      );

      if (retweetedPostIndex !== -1) {
        state.posts.splice(retweetedPostIndex, 1);
        state.posts.push(action.payload.retweetedPost);
      }
    },
    [retweetButtonPressed.rejected]: (state, action) => {
      state.error = "error";
      toast.error(action.payload.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500,
      });
    },
    [bookmarkButtonPressed.fulfilled]: (state, action) => {
      const bookmarkedPostIndex = state.posts.findIndex(
        (post) => post._id === action.payload.bookmarkedPost._id
      );

      if (bookmarkedPostIndex !== -1) {
        state.posts.splice(bookmarkedPostIndex, 1);
        state.posts.push(action.payload.bookmarkedPost);
      }
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

export const { resetPosts } = postsSlice.actions;

export default postsSlice.reducer;
