import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "./component/index-component";
import {
  Liked,
  WatchLater,
  History,
  PlaylistPage,
  Explore,
  VideoDetails,
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
          <Route path="/video/:videoId" element={<VideoDetails />} />
        </Routes>
        <ToastContainer autoClose={700} />
      </div>
    </div>
  );
}

export default App;
