import React, { useEffect } from "react";
import { TitleIcon } from "../../assets";
import { useDispatch } from "react-redux";
import { loadUsers } from "../users/usersSlice";
import { Feed } from "./Feed";

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center px-3 py-3 border-b border-gray-100 sticky top-0 w-full bg-white cursor-pointer">
        <span className="text-xl font-extrabold">Home</span>
        <TitleIcon />
      </div>
      <Feed />
    </div>
  );
};
