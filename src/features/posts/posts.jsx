import React, { useEffect } from "react";
import { NewPost } from "./NewPost";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "./PostCard";
import { loadAllPosts } from "./postSlice";
import { EmptyPosts } from "./EmptyPosts";
import { isUserPresent } from "../../utils/utils";

export const Posts = () => {
  const dispatch = useDispatch();
  const { status, posts } = useSelector((state) => state.feed);
  const { currentUser } = useSelector((state) => state.auth);

  const followingUsersPosts = posts?.filter(
    ({ userId: { _id } }) =>
      isUserPresent(currentUser?.following, _id) || currentUser?._id === _id
  );

  const sortedPosts = followingUsersPosts
    ?.slice()
    .sort((a, b) => b.postDate.localeCompare(a.postDate));

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadAllPosts());
    }
  }, [dispatch, status]);

  return (
    <>
      <NewPost />
      <div className="h-3 bg-extra-light-gray"></div>
      <div>
        {sortedPosts.length === 0 && status === "fulfilled" ? (
          <EmptyPosts />
        ) : (
          sortedPosts?.map((post) => <PostCard post={post} key={post._id} />)
        )}
      </div>
    </>
  );
};
