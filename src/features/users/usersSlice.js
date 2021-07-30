import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = {
  users: [
    {
      userId: nanoid(),
      name: "Tanay Pratap",
      userName: "tanaypratap",
      posts: [
        {
          postId: nanoid(),
          postContent: "TS is the future",
          likes: 0,
          replies: 0,
          reposts: 0,
          bookmarks: 0,
          date: sub(new Date(), { minutes: 10 }).toISOString(),
          allReplies: [],
        },
        {
          postId: nanoid(),
          postContent: "Redux is love",
          likes: 0,
          replies: 0,
          reposts: 0,
          bookmarks: 0,
          date: sub(new Date(), { minutes: 20 }).toISOString(),
          allReplies: [],
        },
      ],
    },
    {
      userId: nanoid(),
      name: "Swapnil Agarwal",
      userName: "swap",
      posts: [
        {
          postId: nanoid(),
          postContent: "Come with 5 projects & 3 blogs and get a dev job",
          likes: 0,
          replies: 0,
          reposts: 0,
          bookmarks: 0,
          date: sub(new Date(), { minutes: 5 }).toISOString(),
          allReplies: [],
        },
        {
          postId: nanoid(),
          postContent: "The backbone of roc8 is here fellas!",
          likes: 0,
          replies: 0,
          reposts: 0,
          bookmarks: 0,
          date: sub(new Date(), { minutes: 24 }).toISOString(),
          allReplies: [],
        },
      ],
    },
    {
      userId: nanoid(),
      name: "Akanksha Choudhary",
      userName: "akanksha_ch",
      posts: [
        {
          postId: nanoid(),
          postContent:
            "I take care of JS interview and will prep you all like never before.",
          likes: 0,
          replies: 0,
          reposts: 0,
          bookmarks: 0,
          date: sub(new Date(), { minutes: 12 }).toISOString(),
          allReplies: [],
        },
      ],
    },
    {
      userId: nanoid(),
      name: "Dan Abramov",
      userName: "dan_abramov",
      posts: [
        {
          postId: nanoid(),
          postContent:
            "I am the one who wrote Redux, the ultimate state management library.",
          likes: 0,
          replies: 0,
          reposts: 0,
          bookmarks: 0,
          date: sub(new Date(), { minutes: 8 }).toISOString(),
          allReplies: [],
        },
      ],
    },
    {
      userId: nanoid(),
      name: "Kent C. Dodds",
      userName: "kentcdoods",
      posts: [
        {
          postId: nanoid(),
          postContent:
            "Learn react and core concepts like never before, checkout my blogs.",
          likes: 0,
          replies: 0,
          reposts: 0,
          bookmarks: 0,
          date: sub(new Date(), { minutes: 45 }).toISOString(),
          allReplies: [],
        },
      ],
    },
  ],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
