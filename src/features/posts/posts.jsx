import React from "react";
import { NewPost } from "./NewPost";
import { useSelector } from "react-redux";
import { PostCard } from "./PostCard";

export const Posts = () => {
  const posts = useSelector((state) => state.feed.posts);
  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <NewPost />
      <div className="h-3 bg-extra-light-gray"></div>
      <div>
        {sortedPosts.map((post) => (
          <PostCard post={post} key={post.postId} />
        ))}
      </div>
    </>
  );
};
