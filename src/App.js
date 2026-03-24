import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./component/index-component";
import RequiresAuth from "./Utilities/requiresAuth";
import {
  Liked,
  WatchLater,
  History,
  Playlist,
  Explore,
  VideoDetails,
  PlaylistDetail,
  Login,
  SignUp,
} from "./Pages/index-page";

function App() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {!isAuthRoute ? <Header /> : null}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route
            path="/watchLater"
            element={
              <RequiresAuth>
                <WatchLater />
              </RequiresAuth>
            }
          />
          <Route
            path="/liked"
            element={
              <RequiresAuth>
                <Liked />
              </RequiresAuth>
            }
          />
          <Route
            path="/history"
            element={
              <RequiresAuth>
                <History />
              </RequiresAuth>
            }
          />
          <Route
            path="/playlistPage"
            element={
              <RequiresAuth>
                <Playlist />
              </RequiresAuth>
            }
          />
          <Route path="/video/:videoId" element={<VideoDetails />} />
          <Route
            path="/playlistDetail/:playlistId"
            element={
              <RequiresAuth>
                <PlaylistDetail />
              </RequiresAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={1800}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
          toastClassName="vidin-toast"
          bodyClassName="vidin-toast-body"
          progressClassName="vidin-toast-progress"
        />
      </main>
    </div>
  );
}

export default App;
