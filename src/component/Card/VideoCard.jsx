import React from "react";
import { Link } from "react-router-dom";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { Play } from "lucide-react";

function VideoCard({ video }) {
  const { dispatch } = useVideo();

  return (
    <div className="surface-card group overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      <div className="relative">
        <Link
          to={`/video/${video.id}`}
          onClick={() => {
            dispatch({ type: "ADD_TO_HISTORY", payload: video });
          }}
        >
          <img
            src={video.thumbnail}
            alt={`${video.title} thumbnail`}
            className="h-44 w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button className="rounded-full bg-blue-500 p-3 text-slate-100 hover:bg-blue-400">
              <Play className="w-6 h-6" />
            </button>
          </div>
        </Link>
      </div>
      <div className="space-y-2 p-4">
        <h3 className="truncate text-base font-semibold text-slate-100">{video.title}</h3>
        <p className="line-clamp-2 text-sm text-slate-400">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
          <span>{video.category}</span>
          <span>{video.duration}</span>
        </div>
      </div>
    </div>
  );
}

export { VideoCard };
