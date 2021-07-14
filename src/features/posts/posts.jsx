import React from "react";
import { NewPost } from "../../components";
import {
  ReplyIcon,
  RepostIcon,
  LikeIcon,
  AddToBookmarkIcon,
} from "../../assets";
import { likeButtonPressed } from "./postSlice";
import { useSelector, useDispatch } from "react-redux";

export const Posts = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  return (
    <>
      <NewPost />
      <div>
        {feed.posts.map((post) => (
          <div key={post.postId} className="flex flex-col p-4">
            <h3>{post.postContent}</h3>
            <div className="flex justify-between">
              <span className="flex items-center space-x-2">
                <ReplyIcon />
                <button>{post.replies}</button>
              </span>
              <span
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() =>
                  dispatch(likeButtonPressed({ postId: post.postId }))
                }
              >
                <LikeIcon />
                <button>{post.likes}</button>
              </span>
              <span className="flex items-center space-x-2">
                <RepostIcon />
                <button>{post.reposts}</button>
              </span>
              <span className="flex items-center space-x-2">
                <AddToBookmarkIcon />
                <button>{post.bookmarks}</button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
