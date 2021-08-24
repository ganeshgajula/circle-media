import { React } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LeftArrow } from "../../assets";
import { UserCard } from "./UserCard";

export const Following = () => {
  const { selectedUser } = useSelector((state) => state.users);
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center px-3 py-2 border-b border-gray-100 sticky top-0 w-full bg-white cursor-pointer">
        <span
          className="p-2 hover:bg-blue-50 rounded-full"
          onClick={() => navigate(`/profile/${selectedUser?.username}`)}
        >
          <LeftArrow />
        </span>
        <span className="text-xl font-extrabold ml-8">Following</span>
      </div>
      {selectedUser?.following.map((user) => (
        <UserCard {...user} key={user._id} />
      ))}
    </div>
  );
};
