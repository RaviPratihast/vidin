import React from "react";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { useNavigate } from "react-router-dom";
import { VideoCard, Button } from "../../component/index-component";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure this is imported in your main entry file
import DeleteIcon from "@mui/icons-material/Delete";

const History = () => {
  const { state, dispatch } = useVideo();
  const navigate = useNavigate();

  const handleDeleteVideo = (videoId) => {
    dispatch({
      type: "REMOVE_FROM_HISTORY",
      payload: videoId,
    });
    toast.success("Video removed from History!");
  };

  const handleDeleteAll = () => {
    dispatch({ type: "REMOVE_ALL_HISTORY" });
    toast.success("All videos removed from History!");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
        
          <div className="shadow-lg h-20 sm:h-24 w-full sm:w-60 flex flex-col justify-center items-center border border-gray-700 rounded-md mb-4 sm:mb-8">
            <h3 className="text-gray-700 text-center">
              History: {state.history.length}
            </h3>
          </div>
          {state.history.length > 0 && (
            <Button
              onClick={handleDeleteAll}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
            >
              Delete All Videos
            </Button>
          )}
        </div>

        {state.history.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {state.history.map((video) => (
              <div key={video.id} className="relative">
                <VideoCard video={video} />
                <Button
                  className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 focus:outline-none"
                  onClick={() => handleDeleteVideo(video.id)}
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
                Looks like you haven't watched anything yet.
              </h2>
              <Button
                onClick={() => navigate("/")}
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

export { History };
