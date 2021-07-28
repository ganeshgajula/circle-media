import React from "react";
import { NewPost } from "./NewPost";
import { useSelector } from "react-redux";
import { PostCard } from "./PostCard";

export const Posts = () => {
  const feed = useSelector((state) => state.feed);

  return (
    <>
      <NewPost />
      <div className="h-3 bg-extra-light-gray"></div>
      <div>
        {feed.posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </>
  );
};
