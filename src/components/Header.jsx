import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-black text-white w-full flex justify-between items-center p-4 sticky top-0 z-50 shadow-md">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-2xl font-bold">MovieFlix</h1>
        </Link>
      </div>

      <nav className="space-x-4 text-sm sm:text-base">
        <Link to="/" className="hover:text-blue-400 transition">
          Home
        </Link>
        <Link to="/favorites" className="hover:text-blue-400 transition">
          Favorites
        </Link>
      </nav>
    </header>
  );
}

export default Header;
