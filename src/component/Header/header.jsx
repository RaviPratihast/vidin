import React, { useEffect, useState } from "react";
import { Menu, Search, LogOut, LogIn, X } from "lucide-react";
import { Button } from "../index-component";
import { NavLink, useNavigate } from "react-router-dom";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { useAuth } from "../../Context/Auth-Context/auth-context";
import { toast } from "react-toastify";

const NAV_ITEMS = [
  { label: "Watch Later", to: "/watchLater" },
  { label: "Liked", to: "/liked" },
  { label: "History", to: "/history" },
  { label: "Playlist", to: "/playlistPage" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useVideo();
  const { stateAuth, dispatchAuth } = useAuth();

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch({ type: "SEARCH_VIDEOS", payload: value });
    navigate("/");
  };

  const handleClick = () => {
    if (stateAuth.loggedIn) {
      dispatchAuth({ type: "USER_LOGOUT" });
      navigate("/login");
      toast.success("Logged Out");
      return;
    }

    navigate("/login");
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Button
            className="h-11 w-11 rounded-lg border border-slate-700 bg-slate-900 px-0 py-0 text-slate-200 hover:bg-slate-800"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <NavLink to="/" className="text-lg font-semibold tracking-wide text-slate-100">
            vidIn
          </NavLink>
        </div>
        <Button
          onClick={handleClick}
          className="h-11 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 hover:bg-slate-800"
        >
          {stateAuth.loggedIn ? <LogOut className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
        </Button>
      </header>

      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 lg:flex">
        <div className="px-6 py-8">
          <NavLink to="/" className="text-xl font-semibold tracking-wide text-slate-100">
            vidIn
          </NavLink>
        </div>
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-500/20 text-blue-200"
                        : "text-slate-300 hover:bg-slate-900 hover:text-slate-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="fixed left-0 right-0 top-0 z-30 hidden h-20 items-center justify-end border-b border-slate-800 bg-slate-950 px-6 lg:left-64 lg:flex">
        <div className="flex w-full max-w-5xl items-center justify-end gap-4">
          <div className="flex w-full max-w-xl items-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search videos..."
              className="ml-2 w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button
            onClick={handleClick}
            className="h-11 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-slate-100 hover:bg-slate-800"
          >
            {stateAuth.loggedIn ? (
              <>
                <LogOut className="h-4 w-4" />
                <span className="ml-2">Logout</span>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span className="ml-2">Login</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-slate-950/80"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 border-b border-slate-800 bg-slate-950">
            <div className="flex h-16 items-center justify-between px-4">
              <span className="text-base font-semibold text-slate-100">Menu</span>
              <Button
                className="h-11 w-11 rounded-lg border border-slate-700 bg-slate-900 px-0 py-0 text-slate-200 hover:bg-slate-800"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="border-t border-slate-800 px-4 pb-6 pt-4">
              <div className="mb-5 flex items-center rounded-xl border border-slate-700 bg-slate-900 px-3 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  className="ml-2 w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Library
              </p>
              <nav>
                <ul className="space-y-2">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-3 py-3 text-sm font-medium ${
                            isActive
                              ? "bg-blue-500/20 text-blue-200"
                              : "text-slate-200 hover:bg-slate-900"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 border-t border-slate-800 pt-4">
                <Button
                  onClick={() => {
                    setMenuOpen(false);
                    handleClick();
                  }}
                  className="w-full justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                >
                  {stateAuth.loggedIn ? (
                    <>
                      <LogOut className="h-4 w-4" />
                      <span className="ml-2">Logout</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4" />
                      <span className="ml-2">Login</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
