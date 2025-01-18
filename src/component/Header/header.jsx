import React, { useState } from "react";
import { Menu, Search, LogOut, LogIn } from "lucide-react"; // Importing icons from Lucide
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

    navigate("/");
  };

  const handleClick = (event) => {
    if (stateAuth.loggedIn) {
      dispatchAuth({ type: "USER_LOGOUT" });
      navigate("/login");
      toast.success("Logged Out");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 flex items-center justify-between z-10 shadow-lg">

      <div className="flex items-center">
        <Button
          className="mr-4 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-6 h-6 text-white" />
        </Button>

        <NavLink to="/" className="text-2xl font-bold">
          vidIn
        </NavLink>

    
        <nav className="hidden lg:flex ml-8">
          <ul className="flex gap-6">
            {["WatchLater", "Liked", "History", "PlaylistPage"].map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                className="hover:text-gray-400"
                activeClassName="text-gray-400"
              >
                {item}
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>

     
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-white p-4 md:hidden">
          <nav>
            <ul className="flex flex-col gap-4">
              {["WatchLater", "Liked", "History", "PlaylistPage"].map((item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="hover:text-gray-400"
                  activeClassName="text-gray-400"
                >
                  {item}
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>
      )}

    
      <div className="hidden md:flex items-center">
        <div className="flex items-center bg-gray-700/50 rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search videos..."
            className="bg-transparent border-none focus:outline-none ml-2 w-64 text-white placeholder-gray-400"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

 
      <div className="flex items-center">
        <Button
          onClick={handleClick}
          className="bg-gray-700 text-white py-2 px-4 rounded border border-transparent hover:bg-gray-600 hover:border-white flex items-center gap-2"
        >
          {stateAuth.loggedIn ? (
            <>
              <LogOut className="w-4 h-4" />
              Logout
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Login
            </>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
