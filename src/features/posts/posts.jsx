import React from "react";
import { NewPost } from "../../components";
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
import { useSelector, useDispatch } from "react-redux";
import { isPostPresent } from "../../utils/utils";

export const Posts = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  return (
    <>
      <NewPost />
      <div>
        {feed.posts.map((post) => (
          <div key={post.postId} className="flex flex-col p-4">
            <div
              className="flex items-center space-x-2"
              style={{
                display: !isPostPresent(feed.repostedPosts, post.postId)
                  ? "none"
                  : "flex",
              }}
            >
              <UserRepostedIcon />
              <span className="font-bold text-sm gray-text">You Reposted</span>
            </div>
            <div className="flex items-center cursor-pointer">
              <span className="text-2xl mr-2 bg-blue-500 text-white px-1.5 py-1.5 rounded-full ">
                GG
              </span>
            </div>
            <h3>{post.postContent}</h3>
            <div className="flex justify-between">
              <button className="flex items-center cursor-pointer blue-color reply-svg">
                <span className="p-2 hover:bg-blue-100 rounded-full">
                  <ReplyIcon />
                </span>
                <span>{post.replies}</span>
              </button>
              <button
                className="flex items-center cursor-pointer red-color like-svg"
                onClick={() => dispatch(likeButtonPressed({ post }))}
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
                onClick={() => dispatch(repostButtonPressed({ post }))}
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
                onClick={() => dispatch(bookmarkButtonPressed({ post }))}
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
        ))}
      </div>
    </>
  );
};
