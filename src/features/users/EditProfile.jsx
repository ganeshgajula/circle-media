import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { LeftArrow } from "../../assets";
import { editUserProfile } from "./usersSlice";

export const EditProfile = () => {
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.users);
  const username = selectedUser.username;
  const [firstname, setFirstName] = useState(selectedUser.firstname);
  const [lastname, setLastName] = useState(selectedUser.lastname);
  const [bio, setBio] = useState(selectedUser.bio);
  const [location, setLocation] = useState(selectedUser.location);
  const [link, setLink] = useState(selectedUser.link);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex items-center px-3 py-2 border-b border-gray-100 sticky top-0 w-full bg-white cursor-pointer">
        <span
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-blue-50 rounded-full"
        >
          <LeftArrow />
        </span>
        <span className="text-xl font-extrabold ml-8">Edit Profile</span>
      </div>
      <div className="flex flex-col py-2 px-4 max-w-full mx-auto">
        <div className="flex flex-col mt-6 justify-start">
          <label htmlFor="firstname" className="font-medium text-gray-600">
            First Name
          </label>
          <input
            type="text"
            className="border border-gray-200 rounded-md w-full resize-none p-1"
            maxLength="20"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-6 justify-start">
          <label htmlFor="lastname" className="font-medium text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            className="border border-gray-200 rounded-md w-full resize-none p-1"
            maxLength="20"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-6 justify-start">
          <label htmlFor="bio" className="font-medium text-gray-600">
            Bio
          </label>
          <textarea
            type="text"
            maxLength="160"
            className="border border-gray-200 rounded-md w-full resize-none p-1"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col mt-6 justify-start">
          <label htmlFor="Link" className="font-medium text-gray-600">
            Link
          </label>
          <input
            type="text"
            className="border border-gray-200 rounded-md p-1 w-full"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-6 justify-start">
          <label htmlFor="location" className="font-medium text-gray-600">
            Location
          </label>
          <input
            type="text"
            className="border border-gray-200 rounded-md p-1 w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button
          className="bg-primary text-white max-w-max self-center px-4 py-1 rounded-md font-bold mt-8"
          onClick={() => {
            navigate(`/profile/${username}`);
            dispatch(
              editUserProfile({
                username,
                firstname,
                lastname,
                bio,
                link,
                location,
              })
            );
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
