import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      userId: 1,
      name: "Tanay Pratap",
      userName: "tanaypratap",
    },
    {
      userId: 2,
      name: "Swapnil Agarwal",
      userName: "swap",
    },
    {
      userId: 3,
      name: "Akanksha Choudhary",
      userName: "akanksha_ch",
    },
    {
      userId: 4,
      name: "Dan Abramov",
      userName: "dan_abramov",
    },
    {
      userId: 5,
      name: "Kent C. Dodds",
      userName: "kentcdoods",
    },
  ],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
