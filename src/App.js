import React from "react";
import { Routes, Route } from "react-router-dom";
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
} from "./Pages/index-page";

function App() {
  return (
    <div className="App">
      <Header />
      {/* Main content will go here */}
      <div className="p-4">
        {/* <h1 className="text-4xl font-bold text-center mt-20">
          Welcome to vidIn
        </h1> */}
        <Routes>
          <Route path="/explore" element={<Explore />} />
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
          {/* <Route path="/signup" element={<SignUp />} /> */}
        </Routes>
        <ToastContainer autoClose={700} />
      </div>
    </div>
  );
}

export default App;
