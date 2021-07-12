import React from "react";
import logo from "../../assets/logo.png";
import {
  HomeIcon,
  NotificationIcon,
  BookmarkIcon,
  ProfileIcon,
  MoreIcon,
} from "../../assets";

export const SideNavbar = () => {
  return (
    <nav className="flex flex-col h-screen w-72 px-3 py-3 border-r border-gray-100">
      <img src={logo} alt="brand-logo" className="h-12 w-36 mb-3" />
      <ul>
        <li className="flex items-center px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full primary-color nav-svg">
          <HomeIcon />
          <span className="ml-4 font-bold text-lg">Home</span>
        </li>
        <li className="flex items-center px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full primary-color nav-svg">
          <NotificationIcon />
          <span className="ml-4 font-bold text-lg">Notifications</span>
        </li>
        <li className="flex items-center px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full primary-color nav-svg">
          <BookmarkIcon />
          <span className="ml-4 font-bold text-lg">Bookmarks</span>
        </li>
        <li className="flex items-center px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full primary-color nav-svg">
          <ProfileIcon />
          <span className="ml-4 font-bold text-lg">Profile</span>
        </li>
      </ul>
      <div className="flex items-center mt-64 px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full">
        <span className="text-2xl mr-2 bg-blue-500 text-white px-1.5 py-1.5 rounded-full ">
          GG
        </span>
        <span className="mr-10 space-y-0 flex flex-col">
          <p className="font-bold">Ganesh Gajula</p>
          <small>@ganeshgajula_</small>
        </span>
        <MoreIcon />
      </div>
    </nav>
  );
};
