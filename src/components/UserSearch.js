"use client";
import React, { useState } from "react";
import api from "@/utils/axiosInstance";
import Link from "next/link";

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
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
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full"
        />
        <button onClick={handleSearch} className="btn btn-primary mt-4 w-full">
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-error">{error}</p>}

      <ul className="space-y-4">
        {searchResults.map((profile) => (
          <li key={profile.id} className="flex items-center">
            <Link href={`/profile/${profile.id}`}>
              <div className="flex items-center cursor-pointer">
                <img
                  src={profile.profile_picture || "/profile_default.png"}
                  alt={`${profile.username}'s profile`}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-bold">{profile.username}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
