import React, { useState } from "react";
import { Button } from "../index-component";
import { NavLink, useNavigate } from "react-router-dom";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { useAuth } from "../../Context/Auth-Context/auth-context";
import { toast } from "react-toastify";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useVideo();
  const { stateAuth, dispatchAuth } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    dispatch({ type: "SEARCH_VIDEOS", payload: value });

    navigate("/explore");
  };

  function handleClick(event) {
    if (event.target.innerHTML === "Logout") {
      dispatchAuth({ type: "USER_LOGOUT" });
      navigate("/login");
      toast.success("Logged Out");
    }
    if (event.target.innerHTML === "Login") {
      navigate("/login");
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 flex items-center justify-between z-10">
      <div className="flex items-center">
        <Button
          className="mr-4 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </Button>

        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-800 text-white p-4 md:hidden">
            <nav>
              <ul className="flex gap-6">
                <NavLink to="/watchLater">WatchLater</NavLink>
                <NavLink to="/liked">Liked</NavLink>
                <NavLink to="/history">History</NavLink>
                <NavLink to="/playlistPage">playlist</NavLink>
              </ul>
            </nav>
          </div>
        )}

        <NavLink to="/">
          <span className="text-2xl font-bold">vidIn</span>
        </NavLink>
        <div className="hidden lg:flex ml-11 mt-1">
          <ul className="flex gap-6">
            <NavLink to="/watchLater">WatchLater</NavLink>
            <NavLink to="/liked">Liked</NavLink>
            <NavLink to="/history">History</NavLink>
            <NavLink to="/playlistPage">playlist</NavLink>
          </ul>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="p-2 rounded bg-gray-700 text-white w-96 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <div className="flex items-center">
        <Button
          onClick={handleClick}
          className="bg-gray-700 text-white py-2 px-4 rounded border border-transparent hover:bg-gray-600 hover:border-white"
        >
          {stateAuth.loggedIn ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
