import React from "react";
import {
  HomeIcon,
  NavSearchIcon,
  NotificationIcon,
  ProfileIcon,
} from "../../assets";

export const FooterNavbar = () => {
  return (
    <div className="flex items-center justify-between bg-white px-9 py-4 z-10">
      <HomeIcon />
      <NavSearchIcon />
      <NotificationIcon />
      <ProfileIcon />
    </div>
  );
};
