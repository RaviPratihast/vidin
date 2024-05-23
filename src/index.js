import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { VideoProvider } from "./Context/Video-Context/VideoContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <VideoProvider>
        <App />
      </VideoProvider>
    </Router>
  </React.StrictMode>
);
