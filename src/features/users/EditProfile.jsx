import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { LeftArrow } from "../../assets";
import { editUserProfile } from "./usersSlice";

export const EditProfile = () => {
  const navigate = useNavigate();
  const { selectedUser } = useSelector((state) => state.users);
  const username = selectedUser.username;

  const [avatar, setAvatar] = useState(selectedUser.avatar);
  const [firstname, setFirstName] = useState(selectedUser.firstname);
  const [lastname, setLastName] = useState(selectedUser.lastname);
  const [bio, setBio] = useState(selectedUser.bio);
  const [location, setLocation] = useState(selectedUser.location);
  const [link, setLink] = useState(selectedUser.link);
  const dispatch = useDispatch();

  const firstNameInitial = firstname[0];
  const lastNameInitial = lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  const updateProfileHandler = () => {
    let formData = new FormData();

    formData.append("avatar", avatar);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("bio", bio);
    formData.append("link", link);
    formData.append("location", location);

    dispatch(editUserProfile({ username, formData }));
  };

  return (
    <div>
      <div className="flex items-center justify-between  px-3 py-2 border-b border-gray-100 sticky top-0  w-full">
        <div className="flex items-center bg-white cursor-pointer">
          <span
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-blue-50 rounded-full"
          >
            <LeftArrow />
          </span>
          <span className="text-xl font-extrabold ml-8">Edit Profile</span>
        </div>
        <button
          className="bg-primary text-white rounded-md font-bold py-1 px-3"
          onClick={updateProfileHandler}
        >
          Save
        </button>
      </div>

      <div className="flex flex-col py-2 px-4 max-w-full mx-auto">
        <label htmlFor="profile-image" className="mt-2 mb-5">
          {!avatar ? (
            <div className="h-16 w-16 bg-blue-500 text-white rounded-full flex items-center justify-center">
              <span className="font-semibold text-2xl">{userInitials}</span>
            </div>
          ) : (
            <img
              src={avatar}
              alt="avatar"
              className="object-cover h-20 w-20 rounded-full"
            />
          )}
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
            }}
          />
        </label>
        <div className="flex flex-col justify-start">
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
      </div>
    </div>
  );
};
