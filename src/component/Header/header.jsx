import React, { useState } from "react";
import { Button } from "../index-component";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
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

        <NavLink to="/explore">
          <span className="text-2xl font-bold">vidIn</span>
        </NavLink>
        {/* <span className="text-2xl font-bold">vidIn</span> */}
        <div className="hidden lg:flex ml-11 mt-1">
          <ul className="flex gap-6">
            {/* <li className="text-lg cursor-pointer">Watch Later</li> */}

            {/* <li className="text-lg cursor-pointer">Liked</li> */}
            {/* <li className="text-lg cursor-pointer">History</li> */}
            {/* <li className="text-lg cursor-pointer">Playlist</li> */}
            <NavLink to="/watchLater">WatchLater</NavLink>
            <NavLink to="/liked">Liked</NavLink>
            <NavLink to="/history">History</NavLink>
            <NavLink to="/playlistPage">playlist</NavLink>
          </ul>
        </div>
      </div>
      <div className="hidden md:flex  items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded bg-gray-700 text-white w-96  focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <div className="flex items-center">
        <Button className="bg-gray-700 text-white py-2 px-4 rounded border border-transparent hover:bg-gray-600 hover:border-white">
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
