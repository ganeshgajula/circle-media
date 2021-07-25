import React from "react";
import { Posts } from "../../features/posts/posts";
import { TitleIcon } from "../../assets";

export const Home = () => {
  return (
    <div>
      <div className="flex justify-between items-center px-3 py-3 border-b border-gray-100 sticky top-0 w-full bg-white ">
        <span className="text-xl font-extrabold">Home</span>
        <TitleIcon />
      </div>
      <Posts />
    </div>
  );
};
