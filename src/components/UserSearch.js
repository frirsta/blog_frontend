"use client";
import React, { useEffect, useState, useCallback } from "react";
import api from "@/utils/axiosInstance";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async () => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/profiles/?search=${searchTerm}`);
      setSearchResults(response.data);
    } catch (err) {
      setError("Failed to load search results. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, handleSearch]);

  return (
    <div className="max-w-3xl md:max-w-xl mx-auto px-4 py-8">
      <div className="mb-6">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-ghost">
            <FaSearch />
          </button>
        </label>
        <div className="mb-6"></div>
      </div>
      <div className="w-full flex flex-col items-center">
        {loading && (
          <div className="space-y-4 absolute">
            <div className="flex items-center justify-between w-80 cursor-pointer m-auto">
              <div className="skeleton w-10 h-10 shrink-0 rounded-full"></div>
              <div className="skeleton h-4 w-20"></div>
            </div>
          </div>
        )}
        {error && <p className="text-error">{error}</p>}

        <ul className="space-y-4 absolute">
          {searchResults.map((profile) => (
            <li key={profile.id} className="flex items-center justify-center">
              <Link href={`/profile/${profile.id}`}>
                <div className="flex items-center justify-between w-80 cursor-pointer">
                  <Image
                    width={100}
                    height={100}
                    src={profile.profile_picture || "/profile_default.png"}
                    alt={profile.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-bold">{profile.username}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
