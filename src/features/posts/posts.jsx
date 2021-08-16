import React, { useEffect } from "react";
import { NewPost } from "./NewPost";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "./PostCard";
import { loadAllPosts, loadPosts } from "./postSlice";
import { EmptyPosts } from "./EmptyPosts";

export const Posts = () => {
  const dispatch = useDispatch();
  const { status, posts, feed } = useSelector((state) => state.feed);
  const { currentUser } = useSelector((state) => state.auth);
  // const sortedPosts = posts
  //   ?.slice()
  //   .sort((a, b) => b.postDate.localeCompare(a.postDate));

  const followingUsersDocs = feed?.filter((user) =>
    currentUser?.following.includes(user.userId)
  );

  let addFollowingUserPosts = [];
  const followingUserPosts = followingUsersDocs.map((user) =>
    addFollowingUserPosts.concat(user.posts)
  );

  const finalFeed = [];
  followingUserPosts.map((userPosts) =>
    userPosts.map((post) => finalFeed.push(post))
  );

  const sortedPosts = finalFeed
    ?.slice()
    .sort((a, b) => b.postDate.localeCompare(a.postDate));

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPosts(currentUser._id));
      dispatch(loadAllPosts());
    }
  }, [dispatch, status, currentUser._id]);

  console.log(feed);
  console.log(followingUsersDocs);
  console.log(followingUserPosts);
  console.log(finalFeed);
  console.log(posts);
  console.log(sortedPosts);

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
