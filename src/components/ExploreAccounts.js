import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/axiosInstance";
import FollowButton from "./follows/FollowButton";

const ExploreAccounts = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("profiles/");
        const filteredUsers = response.data.filter(
          (user) => user.id !== currentUser.id && !user.is_following
        );
        setUsers(filteredUsers.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
  console.log(users);
  return (
    <div className="hidden lg:block w-64 pt-14 ml-16">
      {users.length > 0 ? (
        <ul>
          <p className="font-bold text-center">Suggested for you</p>
          <div className="divider"></div>
          {users.map((user) => (
            <li
              className="flex justify-between items-center my-3"
              key={user.id}
            >
              <Link href={`/profile/${user.id}`}>
                <div className="flex items-center">
                  <Image
                    width={100}
                    height={100}
                    src={user.profile_picture}
                    alt={user.username}
                    className="w-11 h-11 rounded-full avatar object-cover"
                  />
                  <p className="text-xs font-bold capitalize ml-1">
                    {user.username}
                  </p>
                </div>
              </Link>
              <FollowButton
                userId={user?.id}
                isFollowing={user?.is_following}
                followId={user?.following_id}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No accounts to explore at the moment</p>
      )}
    </div>
  );
};

export default ExploreAccounts;
