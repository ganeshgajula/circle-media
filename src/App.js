import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { Notifications } from "./pages";
import { Home } from "./features/posts/Home";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { Profile } from "./features/posts/Profile";
import {
  SideNavbar,
  SearchBar,
  SuggestionBox,
  FooterNavbar,
  PrivateRoute,
} from "./components";
import { Signup, Login } from "./features/auth";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          element={
            <div className="flex flex-col h-full">
              <div className="flex w-full m-auto pb-14 md:pb-0">
                <div className="fixed bottom-0 hidden sm:ml-0 sm:block md:ml-12 lg:ml-2 xl:ml-10">
                  <SideNavbar />
                </div>
                <main className="w-full md:w-7/12 lg:w-6/12 xl:w-5/12 min-h-screen h-auto border-l border-r border-gray-100 sm:ml-24 md:ml-36 lg:ml-36 xl:ml-80">
                  <Routes>
                    <PrivateRoute path="/" element={<Home />} />
                    <PrivateRoute
                      path="/posts/:postId"
                      element={<SinglePostPage />}
                    />
                    <PrivateRoute path="/profile" element={<Profile />} />
                    <PrivateRoute
                      path="/notifications"
                      element={<Notifications />}
                    />
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
          }
        />
      </Routes>
    </div>
  );
}

export default App;
