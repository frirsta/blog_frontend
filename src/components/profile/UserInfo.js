import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";

export function UserInfo({ profileData }) {
  return (
    <div className="mt-4 sm:mt-0 sm:pt-1">
      <h1 className="capitalize text-3xl font-bold text-base-content text-left pb-1">
        {profileData?.username}
      </h1>
      {profileData?.location && (
        <div className="flex items-start pb-1">
          <IoLocationOutline /> &nbsp;
          <p className="text-xs sm:text-sm font-medium text-base-content/70">
            {profileData?.location}
          </p>
        </div>
      )}
      {profileData?.website && (
        <div className="flex items-start pb-1">
          <IoLinkSharp /> &nbsp;
          <p className="text-xs sm:text-sm font-medium text-base-content/70">
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
      <div className="flex items-start pb-1">
        <p className="text-xs sm:text-sm font-medium text-base-content/70">
          {profileData?.bio}
        </p>
      </div>
    </div>
  );
}
