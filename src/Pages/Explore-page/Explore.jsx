import React from "react";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { VideoCard } from "../../component/index-component";

const Explore = () => {
  const { state } = useVideo();

  return (
    <div className="min-h-screen pt-16 p-6 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {state.initialVideo.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export { Explore };
