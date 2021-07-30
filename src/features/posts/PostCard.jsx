import React from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { isPostPresent } from "../../utils/utils";
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
  repostButtonPressed,
  bookmarkButtonPressed,
} from "./postSlice";
import { TimeAgo } from "./TimeAgo";

export const PostCard = ({ post }) => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col px-3 pt-3 pb-1 border-b border-gray-100 cursor-pointer"
      onClick={() => {
        navigate(`/posts/${post.postId}`);
      }}
    >
      <div
        className={`${
          !isPostPresent(feed.repostedPosts, post.postId) && "hidden"
        } flex items-center space-x-2 pb-2 ml-8`}
      >
        <UserRepostedIcon />
        <span className="font-bold text-sm gray-text hover:underline">
          You Reposted
        </span>
      </div>
      <div className="flex">
        <div
          className="bg-blue-500 mr-4 text-white h-12 w-14 rounded-full flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/profile");
          }}
        >
          <span className="text-2xl font-semibold">GG</span>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex space-x-1 items-center">
            <span
              className="flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/profile");
              }}
            >
              <span className="font-bold text-base hover:underline">
                Ganesh Gajula
              </span>
              <span className="gray-text ml-1">@ganeshgajula_</span>
            </span>
            <span className="gray-text">
              · <TimeAgo timestamp={post.date} />
            </span>
          </div>

          <article className="mb-1 text-base">{post.postContent}</article>
          <div className="flex items-center justify-between mr-4 sm:mr-7 md:mr-10 lg:mr-14">
            <button className="flex items-center cursor-pointer blue-color reply-svg">
              <span className="p-2 hover:bg-blue-100 rounded-full">
                <ReplyIcon />
              </span>
              <span className={post.replies < 1 && "hidden"}>
                {post.replies}
              </span>
            </button>
            <button
              className="flex items-center cursor-pointer red-color like-svg"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(likeButtonPressed({ post }));
              }}
            >
              <span className="p-2 hover:bg-red-100 rounded-full">
                {!isPostPresent(feed.likedPosts, post.postId) ? (
                  <LikeIcon />
                ) : (
                  <FilledLikeIcon />
                )}
              </span>
              <span
                style={{
                  display: post.likes < 1 && "none",
                  color: !isPostPresent(feed.likedPosts, post.postId)
                    ? "inherit"
                    : "red",
                }}
              >
                {post.likes}
              </span>
            </button>
            <button
              className="flex items-center cursor-pointer green-color repost-svg"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(repostButtonPressed({ post }));
              }}
            >
              <span className="p-2 hover:bg-green-100 rounded-full">
                {!isPostPresent(feed.repostedPosts, post.postId) ? (
                  <RepostIcon />
                ) : (
                  <FilledRepostIcon />
                )}
              </span>
              <span
                style={{
                  display: post.reposts < 1 && "none",
                  color: !isPostPresent(feed.repostedPosts, post.postId)
                    ? "inherit"
                    : "#17bf63",
                }}
              >
                {post.reposts}
              </span>
            </button>
            <button
              className="flex cursor-pointer yellow-color bookmark-svg"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(bookmarkButtonPressed({ post }));
              }}
            >
              <span className="p-2 hover:bg-yellow-100 rounded-full">
                {!isPostPresent(feed.bookmarkedPosts, post.postId) ? (
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
