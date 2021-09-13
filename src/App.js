import React, { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { Notifications } from "./pages";
import { Home } from "./features/posts/Home";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { Profile } from "./features/users/Profile";
import {
  SideNavbar,
  SearchBar,
  SuggestionBox,
  FooterNavbar,
  PrivateRoute,
} from "./components";
import { Signup, Login } from "./features/auth";
import { initializeUser } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import { BookmarkedPosts } from "./features/posts/BookmarkedPosts";
import { Followers } from "./features/users/Followers";
import { Following } from "./features/users/Following";

function App() {
  const dispatch = useDispatch();
  const loginStatus = JSON.parse(localStorage.getItem("userCredentials"));

  useEffect(() => {
    if (loginStatus) {
      dispatch(initializeUser(loginStatus?.username));
    }
  }, [loginStatus, dispatch]);

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
                    <PrivateRoute
                      path="/profile/:username"
                      element={<Profile />}
                    />
                    <PrivateRoute
                      path="/profile/:username/following"
                      element={<Following />}
                    />
                    <PrivateRoute
                      path="/profile/:username/followers"
                      element={<Followers />}
                    />
                    <PrivateRoute
                      path="/bookmarks"
                      element={<BookmarkedPosts />}
                    />
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
