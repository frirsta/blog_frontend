"use client";
import React, { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import CreatePost from "./post/CreatePost";

const Drawer = () => {
  const { handleLogout, currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    currentUser && (
      <div className="fixed z-20 menu bg-base-200 w-fit h-full hidden md:flex justify-between flex-col items-center">
        <ul>
          <li>
            <Link href="/posts">
              <GoHomeFill className="h-[24px] w-[24px]" />
            </Link>
          </li>
          <li>
            <button
              aria-label="Upload post"
              onClick={() => setIsModalOpen(true)}
            >
              <IoIosAddCircle className="h-[24px] w-[24px]" />
            </button>
          </li>
          <li>
            <Link href="/settings">
              <IoMdSettings className="h-[24px] w-[24px]" />
            </Link>
          </li>
        </ul>
        <div>
          <div className="divider"></div>
          <div className="dropdown dropdown-top dropdown-right">
            <div tabIndex={0} role="button" className="avatar">
              <div className="rounded-full">
                <Image
                  className="object-cover rounded-full"
                  alt={`${currentUser?.username} avatar` || "User avatar"}
                  width={24}
                  height={24}
                  src={currentUser?.profile_picture || "/profile_default.png"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={`/profile/${currentUser?.id}`}>Profile</Link>
              </li>
              <li>
                <Link href={"/settings"}>Settings</Link>
              </li>
              <li>
                <button className="text-left" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>

        {isModalOpen && (
          <CreatePost
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </div>
    )
  );
};

export default Drawer;
