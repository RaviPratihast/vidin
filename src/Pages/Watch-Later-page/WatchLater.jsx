import React from "react";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { VideoCard, Button } from "../../component/index-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const WatchLater = () => {
  const { state, dispatch } = useVideo();

  const handleDeleteAll = () => {
    dispatch({ type: "CLEAR_WATCH_LATER" });
    toast.success("All videos Removed from Watch Later");
  };

  const handleDeleteVideo = (video) => {
    dispatch({
      type: "REMOVE_FROM_WATCH_LATER",
      payload: video,
    });
    toast.success("Removed from Watch Later");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">
            Watch Later: {state.watchLater.length}
          </h3>

          {state.watchLater.length !== 0 && (
            <Button
              onClick={() => handleDeleteAll()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none"
            >
              Delete All Videos
            </Button>
          )}
        </div>

        {state.watchLater.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {state.watchLater.map((video) => (
              <div key={video.id} className="relative">
                <VideoCard video={video} />
                <Button
                  className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 focus:outline-none"
                  onClick={() => handleDeleteVideo(video)}
                >
                  <DeleteIcon />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-20 flex justify-center text-gray-600">
            <p>No videos saved for later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { WatchLater };
