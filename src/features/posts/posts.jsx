import React from "react";
import { NewPost } from "../../components";
import {
  ReplyIcon,
  RepostIcon,
  FilledRepostIcon,
  LikeIcon,
  FilledLikeIcon,
  AddToBookmarkIcon,
} from "../../assets";
import { likeButtonPressed, repostButtonPressed } from "./postSlice";
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
            <div></div>
            <h3>{post.postContent}</h3>
            <div className="flex justify-between">
              <span className="flex items-center cursor-pointer blue-color reply-svg">
                <span className="p-2 hover:bg-blue-100 rounded-full">
                  <ReplyIcon />
                </span>
                <button>{post.replies}</button>
              </span>
              <span
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
                <button
                  style={{
                    display: post.likes < 1 && "none",
                    color: !isPostPresent(feed.likedPosts, post.postId)
                      ? "inherit"
                      : "red",
                  }}
                >
                  {post.likes}
                </button>
              </span>
              <span
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
                <button
                  style={{
                    display: post.reposts < 1 && "none",
                    color: !isPostPresent(feed.repostedPosts, post.postId)
                      ? "inherit"
                      : "#17bf63",
                  }}
                >
                  {post.reposts}
                </button>
              </span>
              <span className="flex items-center cursor-pointer yellow-color bookmark-svg">
                <span className="p-2 hover:bg-yellow-100 rounded-full">
                  <AddToBookmarkIcon />
                </span>
                <button>{post.bookmarks}</button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
