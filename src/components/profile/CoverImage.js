import Image from "next/image";
import React from "react";

export default function CoverImage({ coverPicture }) {
  return (
    <div className="relative">
      <Image
        src={coverPicture}
        alt="Cover"
        width={2000}
        height={2000}
        className="object-cover w-full h-[300px]"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
  );
}
