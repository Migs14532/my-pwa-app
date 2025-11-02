import React from "react";

function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="flex justify-center my-4 gap-2">
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-96"
      />
      <button
        onClick={onSearch}
        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
