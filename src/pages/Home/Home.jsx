import React from "react";
import { SideNavbar, SearchBar, SuggestionBox } from "../../components";
import { Posts } from "../../features/posts/posts";
import { TitleIcon } from "../../assets";

// flex w-full m-auto

export const Home = () => {
  return (
    <div className="flex w-full m-auto">
      <div className="fixed bottom-0 lg:ml-10">
        <SideNavbar />
      </div>
      <main className="md:w-7/12 lg:w-6/12 xl:w-5/12 min-h-screen h-auto border-l border-r border-gray-100 md:ml-24 lg:ml-36 xl:ml-80">
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
