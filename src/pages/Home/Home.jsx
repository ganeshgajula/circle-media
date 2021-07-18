import React from "react";
import { SideNavbar, SearchBar, SuggestionBox } from "../../components";
import { Posts } from "../../features/posts/posts";
import { TitleIcon } from "../../assets";

// flex w-full m-auto

export const Home = () => {
  return (
    <div className="flex w-full m-auto">
      <div className="fixed bottom-0 md:ml-10">
        <SideNavbar />
      </div>
      <main className="w-44 min-h-screen h-auto border-r border-gray-100 ml-72 md:ml-80">
        <div className="flex justify-between items-center px-3 py-3 border-b border-gray-100">
          <span className="text-xl font-extrabold">Home</span>
          <TitleIcon />
        </div>
        <Posts />
      </main>
      <aside className="ml-8 w-22">
        <SearchBar />
        <SuggestionBox />
      </aside>
    </div>
  );
};
