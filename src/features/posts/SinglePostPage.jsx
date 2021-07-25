import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) =>
    state.feed.posts.map((post) => post.postId === postId)
  );

  return (
    <div>
      <div>Inside Single post page</div>
      <div>Complete this sooner ganesh</div>
    </div>
  );
};
