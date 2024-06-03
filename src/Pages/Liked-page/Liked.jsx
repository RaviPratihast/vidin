import React from "react";
import { useNavigate } from "react-router-dom";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { VideoCard, Button } from "../../component/index-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //
const Liked = () => {
  const { state, dispatch } = useVideo();
  const navigate = useNavigate();

  const handleDeleteAll = () => {
    dispatch({ type: "CLEAR_LIKED" });
    toast.success(" All videos Removed from Liked");
  };

  const handleDeleteVideo = (video) => {
    dispatch({
      type: "REMOVE_FROM_LIKED",
      payload: video,
    });
    toast.success("Removed from Liked");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="shadow-lg h-20 sm:h-24 w-full sm:w-60 flex flex-col justify-center items-center border border-gray-700 rounded-md mb-4 sm:mb-8">
            <h3 className="text-gray-700 text-center">
              Liked: {state.liked.length}
            </h3>
          </div>
          {state.liked.length > 0 && (
            <Button
              onClick={handleDeleteAll}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
            >
              Delete All Videos
            </Button>
          )}
        </div>

        {state.liked.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {state.liked.map((video) => (
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
          <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-8">
            <div className="border shadow-lg h-auto sm:h-60 w-full max-w-md p-8 sm:p-20 flex flex-col justify-center items-center gap-4 sm:gap-2 rounded-md border-gray-700">
              <h2 className="text-lg text-gray-700 text-center">
                Looks like you haven't liked anything yet.
              </h2>
              <Button
                onClick={() => navigate("/explore")}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Watch Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Liked };
