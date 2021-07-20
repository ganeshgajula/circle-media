import React, { useState } from "react";
import { SideDrawer } from "..";
import { HomeIcon, NavSearchIcon, NotificationIcon } from "../../assets";
import { useSelector } from "react-redux";

export const FooterNavbar = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const user = useSelector((state) => state.users);

  let initials = "";
  user.users[0].name
    .split(" ")
    .map((word) => (initials += word[0].toUpperCase()));

  return (
    <>
      {showSideDrawer && <SideDrawer setShowSideDrawer={setShowSideDrawer} />}
      <div className="flex items-center justify-between bg-white px-9 py-4 z-10">
        <span>
          <HomeIcon />
        </span>
        <span>
          <NavSearchIcon />
        </span>
        <span>
          <NotificationIcon />
        </span>
        <div
          className="h-8 w-8 bg-blue-500 text-white flex items-center justify-center rounded-full"
          onClick={() => setShowSideDrawer(true)}
        >
          <span className="text-base font-medium">{initials}</span>
        </div>
      </div>
    </>
  );
};
