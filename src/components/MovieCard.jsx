import { useState, useEffect } from "react";

function MovieCard({ movie, onSelectMovie }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const toggleFavorite = (e) => {
    e.stopPropagation(); 
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div
      className="bg-white shadow rounded-lg p-3 text-center cursor-pointer hover:shadow-xl transition relative"
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "logo192.png"
        }
        alt={movie.Title}
        className="w-full h-64 object-cover rounded-md"
      />
      <h2 className="font-bold mt-2">{movie.Title}</h2>
      <p className="text-sm text-gray-600">{movie.Year}</p>
      
      <button
        onClick={toggleFavorite}
        className={`cursor-pointer absolute top-2 right-2 text-2xl ${
          isFavorite ? "text-red-500" : "text-gray-400"
        }`}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default MovieCard;
