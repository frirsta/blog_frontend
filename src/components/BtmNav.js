"use client";
import React, { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { IoIosAddCircle } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import CreatePost from "./post/CreatePost";
export default function BtmNav() {
  const { handleLogout, currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="fixed z-20">
      {currentUser && (
        <>
          <div className="btm-nav md:hidden bg-base-200">
            <Link href="/posts">
              <GoHomeFill className="h-[24px] w-[24px]" />
            </Link>
            <button
              aria-label="Upload post"
              onClick={() => setIsModalOpen(true)}
            >
              <IoIosAddCircle className="h-[24px] w-[24px]" />
            </button>
            <div>
              <div className="dropdown dropdown-top dropdown-left">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="rounded-full">
                    <Image
                      alt={`${currentUser?.username} avatar` || "User avatar"}
                      width={24}
                      height={24}
                      src={
                        currentUser.profile_picture || "/profile_default.png"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link href={`/profile/${currentUser.id}/`}>Profile</Link>
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
          </div>
          {isModalOpen && (
            <CreatePost
              isOpen={isModalOpen}
              closeModal={() => setIsModalOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
