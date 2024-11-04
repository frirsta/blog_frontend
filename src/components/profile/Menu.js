import React from "react";
import Link from "next/link";
import { HiDotsVertical } from "react-icons/hi";

const Menu = ({ onLogout }) => {
  return (
    <div className="mt-5 flex justify-center sm:mt-0 absolute top-0 py-3 pr-8 right-0 sm:relative sm:p-0">
      <div className="dropdown dropdown-left">
        <button tabIndex={0} className="btn btn-sm">
          <HiDotsVertical />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <Link href="edit/">Edit profile</Link>
          </li>
          <li>
            <Link href={"/settings"}>Settings</Link>
          </li>
          <li>
            <button className="text-left" onClick={onLogout}>
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
