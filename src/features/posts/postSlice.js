import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      postId: nanoid(),
      postContent: "Sample post",
      likes: 0,
      comments: 0,
      replies: 0,
      bookmarks: 0,
    },
  ],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    newPostCreated: (state, action) => {
      state.posts.push({
        postId: nanoid(),
        postContent: action.payload,
        likes: 0,
        comments: 0,
        replies: 0,
        bookmarks: 0,
      });
    },
    likeButtonPressed: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );
      console.log(postIndex);
      state.posts[postIndex].likes += 1;
    },
  },
});

export const { newPostCreated, likeButtonPressed } = postsSlice.actions;

export default postsSlice.reducer;
