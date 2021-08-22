import React from "react";
import { useSelector } from "react-redux";
import { EmptyBookmarks } from "./EmptyBookmarks";
import { PostCard } from "./PostCard";

export const BookmarkedPosts = () => {
  const { status, posts } = useSelector((state) => state.feed);
  const {
    currentUser: { _id, username },
  } = useSelector((state) => state.auth);

  const bookmarkedPosts = posts?.filter(({ bookmarkedBy }) =>
    bookmarkedBy.includes(_id)
  );

  return (
    <div>
      <div className="flex flex-col px-3 py-1 border-b border-gray-100 sticky top-0 w-full bg-white">
        <div className="text-xl font-extrabold">Bookmarks</div>
        <small>@{username}</small>
      </div>
      {bookmarkedPosts.length === 0 && status === "fulfilled" ? (
        <EmptyBookmarks />
      ) : (
        bookmarkedPosts?.map((post) => <PostCard post={post} key={post._id} />)
      )}
    </div>
  );
};
