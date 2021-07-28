import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LeftArrow } from "../../assets";
import { ExpandedPostCard } from "./ExpandedPostCard";

export const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) =>
    state.feed.posts.find((post) => post.postId === postId)
  );
  const navigate = useNavigate();

  console.log(post);
  return post ? (
    <div>
      <div className="flex items-center px-3 py-2 border-b border-gray-100 sticky top-0 w-full bg-white cursor-pointer">
        <span
          onClick={() => navigate("/")}
          className="p-2 hover:bg-blue-50 rounded-full"
        >
          <LeftArrow />
        </span>
        <span className="text-xl font-extrabold ml-8">Tweet</span>
      </div>
      <div>
        <ExpandedPostCard post={post} />
      </div>
    </div>
  ) : (
    <div>Post not found</div>
  );
};
