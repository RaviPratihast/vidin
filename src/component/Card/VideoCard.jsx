import React from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../Context/Video-Context/VideoContext";

function VideoCard({ video }) {
  const { dispatch } = useVideo();
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-60">
      <Link
        to={`/video/${video.id}`}
        onClick={() => {
          dispatch({ type: "ADD_TO_HISTORY", payload: video });
        }}
      >
        <img
          src={video.thumbnail}
          alt="Video Thumbnail"
          className="w-full h-36 object-cover rounded-lg"
        />
      </Link>
      <div className="mt-2">
        <h2 className="text-lg font-semibold truncate">{video.title}</h2>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}

export { VideoCard };
