import React from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { isUserIdPresent } from "../../utils/utils";
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
import { TimeAndDateInfo } from "./TimeAndDateInfo";
import { NewReply } from "./NewReply";
import { PostReplies } from "./PostReplies";

export const ExpandedPostCard = ({ post }) => {
  const {
    currentUser: { _id, firstname, lastname, username },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstNameInitial = firstname[0];
  const lastNameInitial = lastname[0];
  const userInitials = `${firstNameInitial}${lastNameInitial}`;

  return (
    <div>
      <div
        key={post._id}
        className="flex flex-col px-3 pt-3 pb-1 border-b border-gray-100"
      >
        <div
          className={`${
            !isUserIdPresent(post.retweetedBy, _id) && "hidden"
          } flex items-center space-x-2 pb-2 ml-8`}
        >
          <UserRepostedIcon />
          <span className="font-bold text-sm gray-text hover:underline">
            You Reposted
          </span>
        </div>
        <div className="flex items-center">
          <div
            className="bg-blue-500 mr-3 text-white h-12 w-12 rounded-full flex items-center justify-center"
            onClick={() => navigate("/profile")}
          >
            <span className="text-2xl font-semibold">{userInitials}</span>
          </div>
          <div className="flex flex-col" onClick={() => navigate("/profile")}>
            <div className="font-bold text-base hover:underline">
              {firstname} {lastname}
            </div>
            <div className="gray-text">@{username}</div>
          </div>
        </div>
        <article className="my-4 ml-1 text-xl font-medium">
          {post.content}
        </article>
        <TimeAndDateInfo timestamp={post.postDate} />
        <div className="flex items-center justify-between mr-4 sm:mr-7 md:mr-10 lg:mr-14 py-2">
          <button className="flex items-center cursor-pointer blue-color reply-svg">
            <span className="p-2 hover:bg-blue-100 rounded-full">
              <ReplyIcon />
            </span>
            <span className={post.replies.length > 0 ? "flex" : "hidden"}>
              {post.replies.length}
            </span>
          </button>
          <button
            className="flex items-center cursor-pointer red-color like-svg"
            onClick={() =>
              dispatch(
                likeButtonPressed({
                  postAuthorId: _id,
                  postId: post._id,
                  likedByUserId: _id,
                })
              )
            }
          >
            <span className="p-2 hover:bg-red-100 rounded-full">
              {!isUserIdPresent(post.likedBy, _id) ? (
                <LikeIcon />
              ) : (
                <FilledLikeIcon />
              )}
            </span>
            <span
              style={{
                display: post.likedBy.length < 1 && "none",
                color: !isUserIdPresent(post.likedBy, _id) ? "inherit" : "red",
              }}
            >
              {post.likedBy.length}
            </span>
          </button>
          <button
            className="flex items-center cursor-pointer green-color repost-svg"
            onClick={() =>
              dispatch(
                retweetButtonPressed({
                  postAuthorId: _id,
                  postId: post._id,
                  retweetedByUserId: _id,
                })
              )
            }
          >
            <span className="p-2 hover:bg-green-100 rounded-full">
              {!isUserIdPresent(post.retweetedBy, _id) ? (
                <RepostIcon />
              ) : (
                <FilledRepostIcon />
              )}
            </span>
            <span
              style={{
                display: post.retweetedBy.length < 1 && "none",
                color: !isUserIdPresent(post.retweetedBy, _id)
                  ? "inherit"
                  : "#17bf63",
              }}
            >
              {post.retweetedBy.length}
            </span>
          </button>
          <button
            className="flex cursor-pointer yellow-color bookmark-svg"
            onClick={() =>
              dispatch(
                bookmarkButtonPressed({
                  postAuthorId: _id,
                  postId: post._id,
                  bookmarkedByUserId: _id,
                })
              )
            }
          >
            <span className="p-2 hover:bg-yellow-100 rounded-full">
              {!isUserIdPresent(post.bookmarkedBy, _id) ? (
                <AddToBookmarkIcon />
              ) : (
                <FilledAddedToBookmarkIcon />
              )}
            </span>
          </button>
        </div>
        <div className="border-t border-gray-100 py-2">
          <p className="text-gray-500 ml-16">
            Replying to <span className="text-primary">@{username}</span>
          </p>
          <NewReply postId={post._id} />
        </div>
      </div>
      <div className="h-3 bg-extra-light-gray"></div>
      <PostReplies replies={post.replies} />
    </div>
  );
};
