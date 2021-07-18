import React, { useState } from "react";
import logo from "../../assets/logo.png";
import initialLogo from "../../assets/c-logo.png";
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
    <nav className="flex flex-col h-screen xl:w-17 px-3 py-3">
      <Link to="/home">
        <img
          src={logo}
          alt="brand-logo"
          className="h-12 w-36 mb-3 hidden xl:block"
        />
        <img
          src={initialLogo}
          alt="brand-logo"
          className="h-11 w-10 mb-3 mt-2 block xl:hidden"
        />
      </Link>
      <ul>
        <li className="flex items-center px-3 py-3  cursor-pointer hover:bg-blue-50 rounded-full primary-color nav-svg">
          <HomeIcon />
          <span className="ml-4 font-bold text-xl hidden xl:block">Home</span>
        </li>
        <li className="flex items-center px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full primary-color nav-svg">
          <NotificationIcon />
          <span className="ml-4 font-bold text-xl hidden xl:block">
            Notifications
          </span>
        </li>
        <li className="flex items-center px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full primary-color nav-svg">
          <BookmarkIcon />
          <span className="ml-4 font-bold text-xl hidden xl:block">
            Bookmarks
          </span>
        </li>
        <li className="flex items-center px-3 py-3 cursor-pointer hover:bg-blue-50 rounded-full primary-color nav-svg">
          <ProfileIcon />
          <span className="ml-4 font-bold text-xl hidden xl:block">
            Profile
          </span>
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
        <span className="mr-6 space-y-0 hidden flex-col xl:flex">
          <p className="font-bold">Ganesh Gajula</p>
          <p>@ganeshgajula_</p>
        </span>
        <div className="hidden xl:block">
          <MoreIcon />
        </div>
      </div>
    </nav>
  );
};
