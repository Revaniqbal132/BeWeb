import React, { useState } from "react";

const SearchBar = ({ searchTerm, setSearchTerm, data, setData }) => {
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = data.filter((item) =>
      item.username.toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      {/* No Results Message */}
      {data.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No results found for "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
