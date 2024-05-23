import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./component/index-component";
import {
  Liked,
  WatchLater,
  History,
  PlaylistPage,
  Explore,
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
          <Route path="/watchLater" element={<WatchLater />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/history" element={<History />} />
          <Route path="/playlistPage" element={<PlaylistPage />} />
        </Routes>

        {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/video/:videoId" element={<VideoDetails />} />
        <Route
          path="/playlist"
          element={
            <RequiresAuth>
              <Playlist />
            </RequiresAuth>
          }
        />
        <Route
          path="playlistDetail/:playlistDetailId"
          element={<PlaylistDetail />}
        />
        <Route
          path="/watch-later"
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes> */}
      </div>
    </div>
  );
}

export default App;
