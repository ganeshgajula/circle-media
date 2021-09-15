import { LeftArrow } from "../../assets";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserCard } from "../users/UserCard";

export const Likes = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const post = useSelector((state) =>
    state.feed.posts.find((post) => post._id === postId)
  );

  console.log("from likes", post);
  return (
    <div>
      <div className="flex items-center px-3 py-2 border-b border-gray-100 sticky top-0 w-full bg-white cursor-pointer">
        <span
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-blue-50 rounded-full"
        >
          <LeftArrow />
        </span>
        <span className="text-xl font-extrabold ml-8">Liked by</span>
      </div>
      {post.likedBy.map((user) => (
        <UserCard {...user} key={user._id} />
      ))}
    </div>
  );
};
