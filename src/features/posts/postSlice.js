import { createSlice, current, nanoid } from "@reduxjs/toolkit";

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

      const isPostLiked = state.likedPosts.find(
        (post) => post.postId === action.payload.postId
      );

      const addPostToLikedVideos = (post, postIndex) => {
        state.likedPosts.push(post);
        state.posts[postIndex].likes += 1;
        console.log(
          "inside add posts to liked videos",
          current(state.likedPosts)
        );
      };

      const removePostFromLikedVideos = (post, postIndex) => {
        state.likedPosts.pop(post);
        state.posts[postIndex].likes -= 1;
        console.log(
          "inside remove posts to liked videos",
          current(state.likedPosts)
        );
      };

      console.log("from outside", current(state.likedPosts));

      !isPostLiked
        ? addPostToLikedVideos(action.payload.post, postIndex)
        : removePostFromLikedVideos(action.payload.post, postIndex);
    },
  },
});

export const { newPostCreated, likeButtonPressed } = postsSlice.actions;

export default postsSlice.reducer;
