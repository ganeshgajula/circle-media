import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CalenderIcon, LeftArrow, LinkIcon, LocationIcon } from "../../assets";
import { isUserIdPresent } from "../../utils/utils";
import { EmptyPosts } from "../posts/EmptyPosts";
import { PostCard } from "../posts/PostCard";
import { MonthAndYearInfo } from "./MonthAndYearInfo";
import { followUnfollowUser } from "./usersSlice";

export const Profile = () => {
  const { username } = useParams();
  const { users } = useSelector((state) => state.users);
  const { status, posts } = useSelector((state) => state.feed);
  const {
    currentUser: { _id, following },
  } = useSelector((state) => state.auth);
  const selectedUser = users.find((user) => user.username === username);
  const selectedUserPosts = posts.filter(
    ({ userId }) => userId.username === selectedUser?.username
  );
  const sortedUserPosts = selectedUserPosts
    ?.slice()
    .sort((a, b) => b.postDate.localeCompare(a.postDate));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstNameInitial = selectedUser?.firstname[0];
  const lastNameInitial = selectedUser?.lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  console.log(_id);
  console.log(users);
  console.log(selectedUser);
  console.log(username);
  console.log(posts);
  console.log(selectedUserPosts);
  return (
    <div>
      <div className="flex items-center px-2 py-1 border-b border-gray-100 sticky top-0 w-full bg-white cursor-pointer">
        <span
          onClick={() => navigate("/")}
          className="p-2 hover:bg-blue-50 rounded-full"
        >
          <LeftArrow />
        </span>
        <span className="ml-6">
          <div className="text-xl font-bold ">
            {selectedUser?.firstname} {selectedUser?.lastname}
          </div>
          <small>{selectedUserPosts.length} Posts</small>
        </span>
      </div>
      <div className="p-3 ">
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="bg-blue-500 text-white h-20 w-20 rounded-full flex items-center justify-center">
              <span className="text-3xl font-semibold">{userInitials}</span>
            </div>
            <div className="font-bold text-xl mt-1">
              {selectedUser?.firstname} {selectedUser?.lastname}
            </div>
            <div className="text-gray-500">@{selectedUser?.username}</div>
          </div>
          {selectedUser?._id === _id ? (
            <button className="font-semibold border border-gray-300 rounded-full px-4 py-1">
              Edit Profile
            </button>
          ) : (
            <button
              className={`${
                !isUserIdPresent(following, selectedUser?._id)
                  ? "border border-blue-400 text-primary  hover:bg-blue-50 "
                  : "bg-primary text-white py-1"
              } font-semibold rounded-2xl px-4 py-1`}
              onClick={() =>
                dispatch(
                  followUnfollowUser({
                    username: selectedUser?.username,
                    currentLoggedInUserId: _id,
                  })
                )
              }
            >
              {!isUserIdPresent(following, selectedUser?._id)
                ? "Follow"
                : "Following"}
            </button>
          )}
        </div>
        <p className="my-2">{selectedUser?.bio}</p>
        <div className="flex space-x-3">
          <span className="flex items-center space-x-1">
            <LocationIcon />
            <span>{selectedUser?.location}</span>
          </span>
          <span className="flex items-center space-x-1">
            <LinkIcon />
            <a
              href="https://ganeshgajula.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              {selectedUser?.link}
            </a>
          </span>
          <span className="flex items-center space-x-1">
            <CalenderIcon />
            <span>
              Joined <MonthAndYearInfo timestamp={selectedUser?.joinedOn} />
            </span>
          </span>
        </div>
        <div className="flex items-center my-2 space-x-5">
          <span className="text-sm">
            <span className="font-extrabold mr-1">
              {selectedUser?.following.length}
            </span>
            Following
          </span>
          <span className="text-sm">
            <span className="font-extrabold mr-1">
              {selectedUser?.followers.length}
            </span>
            Followers
          </span>
        </div>
      </div>
      <div className="border-t border-gray-100 p-2">
        {sortedUserPosts?.length === 0 && status === "fulfilled" ? (
          <EmptyPosts />
        ) : (
          sortedUserPosts?.map((post) => (
            <PostCard post={post} key={post._id} />
          ))
        )}
      </div>
    </div>
  );
};
