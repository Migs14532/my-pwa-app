import MovieCard from "./MovieCard";

function MovieList({ movies, onSelectMovie }) {
  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-600 mt-4">No movies found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </div>
  );
}

export default MovieList;
