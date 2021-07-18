import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  NotificationIcon,
  BookmarkIcon,
  ProfileIcon,
  MoreIcon,
} from "../../assets";
import { LogoutPopover } from "..";

export const SideNavbar = () => {
  const [showLogoutPopover, setShowLogoutPopover] = useState(false);

  return (
    <nav className="flex flex-col h-screen w-17 px-3 py-3 border-r border-gray-100">
      <Link to="/home">
        <img src={logo} alt="brand-logo" className="h-12 w-36 mb-3" />
      </Link>
      <ul>
        <li className="flex items-center px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full primary-color nav-svg">
          <HomeIcon />
          <span className="ml-4 font-bold text-xl">Home</span>
        </li>
        <li className="flex items-center px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full primary-color nav-svg">
          <NotificationIcon />
          <span className="ml-4 font-bold text-xl">Notifications</span>
        </li>
        <li className="flex items-center px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full primary-color nav-svg">
          <BookmarkIcon />
          <span className="ml-4 font-bold text-xl">Bookmarks</span>
        </li>
        <li className="flex items-center px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full primary-color nav-svg">
          <ProfileIcon />
          <span className="ml-4 font-bold text-xl">Profile</span>
        </li>
      </ul>
      {showLogoutPopover && (
        <LogoutPopover setShowLogoutPopover={setShowLogoutPopover} />
      )}
      <div
        className="flex items-center mt-64 px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full"
        onClick={() => setShowLogoutPopover(true)}
      >
        <span className="text-2xl mr-2 bg-blue-500 text-white px-1.5 py-1.5 rounded-full ">
          GG
        </span>
        <span className="mr-6 space-y-0 flex flex-col">
          <p className="font-bold">Ganesh Gajula</p>
          <p>@ganeshgajula_</p>
        </span>
        <MoreIcon />
      </div>
    </nav>
  );
};
