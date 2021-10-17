import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { isUserIdPresent, isUserPresent } from "../../utils/utils";
import {
  ReplyIcon,
  RepostIcon,
  FilledRepostIcon,
  LikeIcon,
  FilledLikeIcon,
  AddToBookmarkIcon,
  FilledAddedToBookmarkIcon,
  UserRepostedIcon,
} from "../../assets";
import {
  likeButtonPressed,
  retweetButtonPressed,
  bookmarkButtonPressed,
} from "./postSlice";
import { TimeAgo } from "./TimeAgo";
import { pushNotification } from "../users/usersSlice";

export const PostCard = ({ post }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstNameInitial = post.userId.firstname[0];
  const lastNameInitial = post.userId.lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;
  const [isLinkBroken, setIsLinkBroken] = useState(false);

  console.log(post);
  return (
    <div
      className="flex flex-col px-3 pt-3 pb-1 border-b border-gray-100 cursor-pointer"
      onClick={() => {
        navigate(`/posts/${post._id}`);
      }}
    >
      <div
        className={`${
          !isUserPresent(post.retweetedBy, currentUser?._id) && "hidden"
        } flex items-center space-x-2 pb-2 ml-8`}
      >
        <UserRepostedIcon />
        <span className="font-bold text-sm gray-text hover:underline">
          You Retweeted
        </span>
      </div>
      <div className="flex">
        {!post.userId.avatar || isLinkBroken ? (
          <div
            className="bg-blue-500 mr-3 sm:mr-4 text-white h-12 w-14 rounded-full flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/profile/${post.userId.username}`);
            }}
          >
            <span className="text-xl font-semibold">{userInitials}</span>
          </div>
        ) : (
          <img
            onError={() => setIsLinkBroken(true)}
            src={post.userId.avatar}
            alt="avatar"
            className="object-cover rounded-full h-12 w-14 mr-3 sm:mr-4"
          />
        )}
        <div className="flex flex-col w-full">
          <div className="flex space-x-1 items-center">
            <span
              className="flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${post.userId.username}`);
              }}
            >
              <span className="font-bold text-base hover:underline">
                {post.userId.firstname} {post.userId.lastname}
              </span>
              <span className="gray-text ml-1">@{post.userId.username}</span>
            </span>
            <span className="gray-text">
              · <TimeAgo timestamp={post.postDate} />
            </span>
          </div>

          <article className="mb-1 text-base whitespace-pre">
            {post.content}
          </article>

          {post.media && (
            <img
              src={post.media}
              alt="post-img"
              className="block mt-1 mb-4 rounded-lg object-cover max-w-full h-auto"
            />
          )}

          <div className="flex items-center justify-between mr-4 sm:mr-7 md:mr-10 lg:mr-14">
            <button className="flex items-center cursor-pointer blue-color reply-svg">
              <span className="p-2 hover:bg-blue-100 rounded-full">
                <ReplyIcon />
              </span>
              <span className={post.replies.length > 0 ? "flex" : "hidden"}>
                {post.replies.length}
              </span>
            </button>
            <button
              className="flex items-center cursor-pointer green-color repost-svg"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  retweetButtonPressed({
                    postAuthorId: post.userId._id,
                    postId: post._id,
                    retweetedByUserId: currentUser?._id,
                  })
                );
                post.userId._id !== currentUser._id &&
                  dispatch(
                    pushNotification({
                      username: post.userId.username,
                      originatorUserId: currentUser._id,
                      type: "Retweeted",
                      postId: post._id,
                    })
                  );
              }}
            >
              <span className="p-2 hover:bg-green-100 rounded-full">
                {!isUserPresent(post.retweetedBy, currentUser?._id) ? (
                  <RepostIcon />
                ) : (
                  <FilledRepostIcon />
                )}
              </span>
              <span
                style={{
                  display: post.retweetedBy.length < 1 && "none",
                  color: !isUserPresent(post.retweetedBy, currentUser?._id)
                    ? "inherit"
                    : "#17bf63",
                }}
              >
                {post.retweetedBy.length}
              </span>
            </button>
            <button
              className="flex items-center cursor-pointer red-color like-svg"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  likeButtonPressed({
                    postAuthorId: post.userId._id,
                    postId: post._id,
                    likedByUserId: currentUser?._id,
                  })
                );
                post.userId._id !== currentUser._id &&
                  dispatch(
                    pushNotification({
                      username: post.userId.username,
                      originatorUserId: currentUser._id,
                      type: "Liked",
                      postId: post._id,
                    })
                  );
              }}
            >
              <span className="p-2 hover:bg-red-100 rounded-full">
                {!isUserPresent(post.likedBy, currentUser?._id) ? (
                  <LikeIcon />
                ) : (
                  <FilledLikeIcon />
                )}
              </span>
              <span
                style={{
                  display: post.likedBy.length < 1 && "none",
                  color: !isUserPresent(post.likedBy, currentUser?._id)
                    ? "inherit"
                    : "red",
                }}
              >
                {post.likedBy.length}
              </span>
            </button>
            <button
              className="flex cursor-pointer yellow-color bookmark-svg"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  bookmarkButtonPressed({
                    postAuthorId: post.userId._id,
                    postId: post._id,
                    bookmarkedByUserId: currentUser?._id,
                  })
                );
              }}
            >
              <span className="p-2 hover:bg-yellow-100 rounded-full">
                {!isUserIdPresent(post.bookmarkedBy, currentUser?._id) ? (
                  <AddToBookmarkIcon />
                ) : (
                  <FilledAddedToBookmarkIcon />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
