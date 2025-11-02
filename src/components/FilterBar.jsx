import { useState } from "react";

function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: "",
    genre: "",
    year: "",
    rating: "",
  });

  const handleChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 p-3 rounded-md w-11/12 sm:w-3/4">
      <select name="category" onChange={handleChange} className="p-2 border rounded">
        <option value="">Category</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <input
        name="genre"
        placeholder="Genre"
        onChange={handleChange}
        className="p-2 border rounded w-24"
      />
      <input
        name="year"
        placeholder="Year"
        onChange={handleChange}
        className="p-2 border rounded w-20"
      />
      <input
        name="rating"
        placeholder="Min Rating"
        type="number"
        onChange={handleChange}
        className="p-2 border rounded w-24"
      />
    </div>
  );
}

export default FilterBar;
