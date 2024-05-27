import React from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { VideoLibrary } from "../../component/VideoLibrary/VideoLibrary";
import { checkingWatchLater } from "../../Utilities/checkingWatchLater";
import { Button } from "../../component/Button/Button";
import { youLikeIt } from "../../Utilities/youLikeIt";

function VideoDetails() {
  const { videoId } = useParams();
  const { state, dispatch } = useVideo();
  const video = state.initialVideo.find((video) => video.id === videoId);

  if (!video) {
    return <div>Video not found</div>;
  }

  const isVideoPresentInWatchLater = checkingWatchLater(state, videoId);
  // console.log(isVideoPresentInWatchLater);
  const isVideoLiked = youLikeIt(state, video);

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-screen-lg mx-auto mt-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full mt-10">
        <div className="aspect-w-16 aspect-h-9">
          <VideoLibrary video={video} />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="p-2">
            <h2 className="text-xl font-semibold">{video.title}</h2>
          </div>
          <div className="flex space-x-2">
            {/* <Button
              className={`px-4 py-2 rounded focus:outline-none ${
                isVideoPresentInWatchLater
                  ? "bg-white text-gray-700 border-2 border-gray-700"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() =>
                // didYouLikedIt &&
                // dispatch({
                //   type: "ADD_TO_LIKED",
                //   payload: video,
                // })
                console.log("hello from like")
              }
            >
              Like
            </Button> */}
            <Button
              className={`px-4 py-2 rounded focus:outline-none ${
                isVideoLiked
                  ? "bg-white text-gray-700 border-2 border-gray-700"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() =>
                isVideoLiked
                  ? (dispatch({
                      type: "REMOVE_FROM_LIKED",
                      payload: video,
                    }),
                    toast.success("Removed from Liked"))
                  : (dispatch({ type: "ADD_TO_LIKED", payload: video }),
                    toast.success("Added to Liked"))
              }
            >
              Like
            </Button>
            <Button
              className={`px-4 py-2 rounded focus:outline-none ${
                isVideoPresentInWatchLater
                  ? "bg-white text-gray-700 border-2 border-gray-700"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() =>
                isVideoPresentInWatchLater
                  ? (dispatch({
                      type: "REMOVE_FROM_WATCH_LATER",
                      payload: video,
                    }),
                    toast.success("Removed from Watch Later"))
                  : (dispatch({ type: "ADD_TO_WATCH_LATER", payload: video }),
                    toast.success("Added to Watch Later"))
              }
            >
              Watch Later
            </Button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none">
              Share
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none">
              Add to Playlist
            </button>
          </div>
        </div>
        <div className="flex flex-col text-slate mt-4">
          <div className="flex flex-col justify-between w-full">
            <div className="h-auto w-full p-2 mt-4">
              <p>{video.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { VideoDetails };
