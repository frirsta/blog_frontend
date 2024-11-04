import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";

export function UserInfo({ profileData }) {
  return (
    <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
      <h1 className="capitalize text-3xl font-bold text-base-content">
        {profileData?.username}
      </h1>
      {profileData?.location && (
        <div className="flex items-center">
          <IoLocationOutline /> &nbsp;
          <p className="text-sm font-medium text-base-content/70">
            {profileData?.location}
          </p>
        </div>
      )}
      {profileData?.website && (
        <div className="flex items-center">
          <IoLinkSharp /> &nbsp;
          <p className="text-sm font-medium text-base-content/70">
            <Link
              className="hover:link transition-all duration-300"
              href={profileData?.website}
              target="_blank"
            >
              {profileData?.website}
            </Link>
          </p>
        </div>
      )}
      <p className="text-sm text-base-content/70 mt-2 text-left">
        {profileData?.bio}
      </p>
    </div>
  );
}
