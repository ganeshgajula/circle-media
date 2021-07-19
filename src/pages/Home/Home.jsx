import React from "react";
import {
  SideNavbar,
  SearchBar,
  SuggestionBox,
  FooterNavbar,
} from "../../components";
import { Posts } from "../../features/posts/posts";
import { TitleIcon } from "../../assets";

export const Home = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex w-full m-auto pb-14 md:pb-0">
        <div className="fixed bottom-0 hidden sm:ml-0 sm:block md:ml-12 lg:ml-2 xl:ml-10">
          <SideNavbar />
        </div>
        <main className="w-full md:w-7/12 lg:w-6/12 xl:w-5/12 min-h-screen h-auto border-l border-r border-gray-100 sm:ml-24 md:ml-36 lg:ml-36 xl:ml-80 flex-wrap">
          <div className="flex justify-between items-center px-3 py-3 border-b border-gray-100">
            <span className="text-xl font-extrabold">Home</span>
            <TitleIcon />
          </div>
          <Posts />
        </main>
        <aside className="ml-8 hidden lg:w-1/4 lg:block xl:w-22">
          <SearchBar />
          <SuggestionBox />
        </aside>
      </div>
      <div className="w-full fixed bottom-0 sm:hidden">
        <FooterNavbar />
      </div>
    </div>
  );
};
