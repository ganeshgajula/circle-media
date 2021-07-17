import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      name: "Tanay Pratap",
      userName: "tanaypratap",
    },
    {
      name: "Swapnil Agarwal",
      userName: "swap",
    },
    {
      name: "Akanksha Choudhary",
      userName: "akanksha_ch",
    },
  ],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
