import { createSlice, current, nanoid } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      postId: nanoid(),
      postContent: "Sample post",
      likes: 0,
      replies: 0,
      reposts: 0,
      bookmarks: 0,
    },
  ],
  likedPosts: [],
  repostedPosts: [],
  bookmarkedPosts: [],
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
        replies: 0,
        reposts: 0,
        bookmarks: 0,
      });

      console.log(current(state));
    },
    likeButtonPressed: (state, action) => {
      const isPostLiked = state.likedPosts.find(
        (post) => post.postId === action.payload.post.postId
      );

      const postIndex = state.posts.findIndex(
        (post) => post.postId === action.payload.post.postId
      );

      const addPostToLikedAndIncrementCount = () => {
        state.likedPosts.push(action.payload.post);
        if (postIndex !== -1) state.posts[postIndex].likes += 1;
      };

      const removePostFromLikedAndDecrementCount = () => {
        state.likedPosts.pop(action.payload.post);
        if (postIndex !== -1) state.posts[postIndex].likes -= 1;
      };

      !isPostLiked
        ? addPostToLikedAndIncrementCount()
        : removePostFromLikedAndDecrementCount();
    },
    repostButtonPressed: (state, action) => {
      const isPostReposted = state.repostedPosts.find(
        (post) => post.postId === action.payload.post.postId
      );

      const postIndex = state.posts.findIndex(
        (post) => post.postId === action.payload.post.postId
      );

      const addPostToRepostsAndIncrementCount = () => {
        state.repostedPosts.push(action.payload.post);
        if (postIndex !== -1) state.posts[postIndex].reposts += 1;
      };

      const removePostFromRepostsAndDecrementCount = () => {
        state.repostedPosts.pop(action.payload.post);
        if (postIndex !== -1) state.posts[postIndex].reposts -= 1;
      };

      !isPostReposted
        ? addPostToRepostsAndIncrementCount()
        : removePostFromRepostsAndDecrementCount();
    },
    bookmarkButtonPressed: (state, action) => {
      const isPostBookmarked = state.bookmarkedPosts.find(
        (post) => post.postId === action.payload.post.postId
      );

      const addToBookmarks = () => {
        state.bookmarkedPosts.push(action.payload.post);
      };

      const removeFromBookmarks = () => {
        state.bookmarkedPosts.pop(action.payload.post);
      };

      !isPostBookmarked ? addToBookmarks() : removeFromBookmarks();
    },
  },
});

export const {
  newPostCreated,
  likeButtonPressed,
  repostButtonPressed,
  bookmarkButtonPressed,
} = postsSlice.actions;

export default postsSlice.reducer;
