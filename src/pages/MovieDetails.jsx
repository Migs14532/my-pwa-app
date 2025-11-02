import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API_KEY = "779bb8a4";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function loadMovie() {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
      const data = await res.json();
      setMovie(data);

      if (data.Genre) {
        const firstGenre = data.Genre.split(",")[0];
        const rel = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${firstGenre}`);
        const relData = await rel.json();
        setRelated(relData.Search || []);
      }
    }
    loadMovie();
  }, [id]);

  if (!movie) return <p className="mt-10 text-gray-500 text-center">Loading...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You rated ${movie.Title} ${rating}/10. Feedback: "${feedback}"`);
    setRating("");
    setFeedback("");
  };

      const openTrailer = () => {
    const query = encodeURIComponent(`${movie.Title} trailer`);
    const url = `https://www.youtube.com/results?search_query=${query}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-4 w-full max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
          alt={movie.Title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Country:</strong> {movie.Country}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
          <p><strong>Quality:</strong> HD</p>
          <p><strong>Rating:</strong> ⭐ {movie.imdbRating}</p>

                <button
          onClick={openTrailer}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ▶ Watch Trailer on YouTube
        </button>


          <h2 className="text-xl mt-4 font-semibold">Synopsis</h2>
          <p className="text-gray-700 mt-2">{movie.Plot}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Related Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {related.slice(0, 8).map((rel) => (
            <div
              key={rel.imdbID}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/movie/${rel.imdbID}`)}
            >
              <img
                src={rel.Poster && rel.Poster !== "N/A" ? rel.Poster : "https://via.placeholder.com/150"}
                alt={rel.Title}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <div className="p-2 text-center">
                <h3 className="font-bold text-sm">{rel.Title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Rate & Give Feedback</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="10"
            placeholder="Your rating (1-10)"
            className="p-2 border rounded-md w-32"
          />
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback..."
            className="p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-32"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
