import React from "react";
import { SideNavbar, SearchBar, SuggestionBox } from "../../components";
import { Posts } from "../../features/posts/posts";
import { TitleIcon } from "../../assets";

export const Home = () => {
  return (
    <div className="flex w-full m-auto">
      <div className="fixed left-0 bottom-0">
        <SideNavbar />
      </div>
      <main className="w-5/12 border-r border-gray-100 ml-72">
        <div className="flex justify-between items-center px-3 py-3 border-b border-gray-100">
          <span className="text-xl font-extrabold">Home</span>
          <TitleIcon />
        </div>
        <Posts />
      </main>
      <aside className="ml-4 w-22">
        <SearchBar />
        <SuggestionBox />
      </aside>
    </div>
  );
};
