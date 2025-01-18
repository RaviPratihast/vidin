import React from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { Play } from "lucide-react";

function VideoCard({ video }) {
  const { dispatch } = useVideo();

  return (
    <div className="bg-gray-800 text-white rounded-lg overflow-hidden group hover:scale-105 transition-transform duration-200 shadow-lg">
      <div className="relative">
        <Link
          to={`/video/${video.id}`}
          onClick={() => {
            dispatch({ type: "ADD_TO_HISTORY", payload: video });
          }}
        >
          <img
            src={video.thumbnail}
            alt="Video Thumbnail"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full">
              <Play className="w-6 h-6" />
            </button>
          </div>
        </Link>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2 truncate">{video.title}</h3>
        <p className="text-sm text-gray-400 mb-2 line-clamp-2">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{video.category}</span>
          <span>{video.duration}</span>
        </div>
      </div>
    </div>
  );
}

export { VideoCard };
