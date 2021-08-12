import React,{useEffect} from "react";
import { NewPost } from "./NewPost";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "./PostCard";
import { loadPosts } from "./postSlice";

export const Posts = () => {
  const {status,posts} = useSelector((state) => state.feed);
  const {currentUser:{_id:userId}} = useSelector(state => state.auth)
  const sortedPosts = posts?.slice().sort((a, b) => b.postDate.localeCompare(a.postDate));
  const dispatch = useDispatch();

  useEffect(() => {
    if(status === "idle"){
      dispatch(loadPosts(userId));
    }
  },[dispatch,status,userId])

  console.log(posts)
  console.log(sortedPosts)
  return (
    <>
      <NewPost />
      <div className="h-3 bg-extra-light-gray"></div>
      <div>
        {sortedPosts?.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};
