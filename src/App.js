import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Notifications } from "./pages";
import {
  SideNavbar,
  SearchBar,
  SuggestionBox,
  FooterNavbar,
} from "./components";

function App() {
  return (
    <Routes>
      <div className="flex flex-col h-full">
        <div className="flex w-full m-auto pb-14 md:pb-0">
          <div className="fixed bottom-0 hidden sm:ml-0 sm:block md:ml-12 lg:ml-2 xl:ml-10">
            <SideNavbar />
          </div>
          <main className="w-full md:w-7/12 lg:w-6/12 xl:w-5/12 min-h-screen h-auto border-l border-r border-gray-100 sm:ml-24 md:ml-36 lg:ml-36 xl:ml-80">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
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
    </Routes>
  );
}

export default App;
