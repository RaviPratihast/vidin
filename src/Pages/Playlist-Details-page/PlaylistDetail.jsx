import React from "react";
import { useParams, Link } from "react-router-dom";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { VideoCard, Button } from "../../component/index-component";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

function PlaylistDetail() {
  const { playlistId } = useParams();
  const { state, dispatch } = useVideo();

  const playlist = state.playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <h2 className="text-lg text-gray-700">Playlist not found!</h2>
      </div>
    );
  }

  function handleRemoveVideo(video) {
    dispatch({
      type: "REMOVE_VIDEO_FROM_PLAYLIST",
      payload: { playlistId, video },
    });
    toast.success("Video removed from playlist");
  }
  function handleClearVideos() {
    dispatch({
      type: "CLEAR_VIDEOS_FROM_PLAYLIST",
      payload: { playlistId },
    });
    toast.success("All videos removed from playlist");
  }
  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {playlist.playlistName}
        </h2>
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleClearVideos}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Delete All
          </Button>
        </div>
        {playlist.videos.length === 0 ? (
          <div className="flex justify-center items-center w-full">
            <div className="border shadow-lg h-60 w-auto p-20 flex flex-col justify-center items-center gap-2 rounded-md border-gray-700">
              <h2 className="text-lg text-gray-700">
                No videos in this playlist!
              </h2>
              <Link
                to="/explore"
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Explore Videos
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {playlist.videos.map((video) => (
              <div key={video.id} className="relative">
                <VideoCard video={video} />
                <Button
                  className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 focus:outline-none"
                  onClick={() => handleRemoveVideo(video)}
                >
                  <DeleteIcon />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { PlaylistDetail };
