import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    feed: postsReducer,
    users: usersReducer,
  },
});
