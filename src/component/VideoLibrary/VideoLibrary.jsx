import React from "react";
import ReactPlayer from "react-player";

const VideoLibrary = ({ video }) => {
  return (
    <div className="w-full h-auto">
      <ReactPlayer url={video.src} controls width="100%" height="100%" />
    </div>
  );
};

export { VideoLibrary };

