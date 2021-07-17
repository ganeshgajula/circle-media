import React from "react";
import { SideNavbar } from "../../components";
import { Posts } from "../../features/posts/posts";
import { TitleIcon } from "../../assets";

export const Home = () => {
  return (
    <div className="flex w-full m-auto">
      <SideNavbar />
      <main className="w-5/12 border-r border-gray-100">
        <div className="flex justify-between items-center px-3 py-3 border-b border-gray-100">
          <span className="text-xl font-extrabold">Home</span>
          <TitleIcon />
        </div>
        <Posts />
      </main>
    </div>
  );
};
