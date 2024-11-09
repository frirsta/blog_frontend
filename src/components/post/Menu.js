import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function Menu({ onDelete }) {
  return (
    <div className="dropdown dropdown-top dropdown-left">
      <div tabIndex={0} role="button">
        <BsThreeDots tabIndex={0} role="button" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <button onClick={onDelete}>
            <MdDelete /> Delete
          </button>
        </li>
      </ul>
    </div>
  );
}
