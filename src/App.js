import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import MovieList from "./components/MovieList.jsx";
import Footer from "./components/Footer.jsx";
import MovieDetails from './pages/MovieDetails.jsx';
import FilterBar from "./components/FilterBar.jsx";
import Banner from "./components/Banner.jsx";
import Favorites from './pages/Favorites.jsx';

const API_KEY = "779bb8a4";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Avengers");
  const [filters, setFilters] = useState({
    category: "",
    genre: "",
    year: "",
    rating: "",
  });

  const navigate = useNavigate();

  const fetchMovies = async (query, filters = {}) => {
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
    if (filters.category) url += `&type=${filters.category}`;
    if (filters.year) url += `&y=${filters.year}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.Search) {
      let filtered = data.Search;

      if (filters.genre || filters.rating) {
        const detailedMovies = await Promise.all(
          filtered.map(async (m) => {
            const res2 = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${m.imdbID}`
            );
            return await res2.json();
          })
        );

        filtered = detailedMovies.filter((m) => {
          const matchGenre = filters.genre
            ? m.Genre?.toLowerCase().includes(filters.genre.toLowerCase())
            : true;
          const matchRating = filters.rating
            ? parseFloat(m.imdbRating) >= parseFloat(filters.rating)
            : true;
          return matchGenre && matchRating;
        });
      }

      setMovies(filtered);
    } else setMovies([]);
  };

  useEffect(() => {
    fetchMovies("Avengers");
  }, []);

  const handleSelectMovie = (id) => navigate(`/movie/${id}`);
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchMovies(searchTerm, newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-gray-800">
      <Banner />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={() => fetchMovies(searchTerm, filters)}
      />
      <FilterBar onFilterChange={handleFilterChange} />
      <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
      <Footer />
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();

  const handleSelectMovie = (id) => navigate(`/movie/${id}`);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites onSelectMovie={handleSelectMovie} />} />
      </Routes>
    </>
  );
}
