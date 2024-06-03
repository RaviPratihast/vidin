import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { VideoProvider } from "./Context/Video-Context/VideoContext";
import { AuthProvider } from "./Context/Auth-Context/auth-context";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <VideoProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </VideoProvider>
    </Router>
  </React.StrictMode>
);
