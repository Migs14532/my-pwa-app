import { useState, useEffect } from "react";

function Favorites({ onSelectMovie }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((movie) => movie.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-6 mb-4">Favorite Movies</h1>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {favorites.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white shadow rounded-lg p-3 text-center relative"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : ""
                }
                alt={movie.Title}
                className="w-full h-64 object-cover rounded-md cursor-pointer"
                onClick={() => onSelectMovie(movie.imdbID)}
              />
              <h2 className="font-bold mt-2">{movie.Title}</h2>
              <p className="text-sm text-gray-600">{movie.Year}</p>

              <button
                onClick={() => removeFavorite(movie.imdbID)}
                className="mt-3 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-10 text-center">
          You have no favorite movies yet. Add some from the movie list!
        </p>
      )}
    </div>
  );
}

export default Favorites;
