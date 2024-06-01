// VideoDetails.js
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { VideoLibrary } from "../../component/VideoLibrary/VideoLibrary";
import { checkingWatchLater } from "../../Utilities/checkingWatchLater";
import { Button, Modal } from "../../component/index-component";

import { youLikeIt } from "../../Utilities/youLikeIt";
import ShareIcon from "@mui/icons-material/Share";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

function VideoDetails() {
  const { videoId } = useParams();
  const { state, dispatch } = useVideo();
  const video = state.initialVideo.find((video) => video.id === videoId);
  // const navigate = useNavigate();
  const [playlistName, setPlaylistName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!video) {
    return <div>Video not found</div>;
  }

  function createSinglePlaylist(name, id) {
    dispatch({
      type: "CREATE_PLAYLIST",
      payload: { id: id, playlistName: name, videos: [] },
    });
    toast.success("Playlist Created");
  }
  function nameForSinglePlaylistCreate() {
    if (playlistName !== "") {
      const id = uuidv4();
      createSinglePlaylist(playlistName, id);
      setPlaylistName("");
    }
  }

  const isVideoPresentInWatchLater = checkingWatchLater(state, videoId);
  const isVideoLiked = youLikeIt(state, video);

  function handleShare() {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch(() => {
        toast.error("Error copying the link");
      });
  }

  const handleAddToPlaylist = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function checkboxHandler(event, playlist) {
    if (event.target.checked === true) {
      dispatch({
        type: "ADD_TO_PLAYLIST",
        payload: { playlistName: playlist.playlistName, videoId: videoId },
      });
      toast.success("Video Added to Playlist");
    }
    if (event.target.checked === false) {
      dispatch({
        type: "REMOVE_FROM_PLAYLIST",
        payload: { playlistName: playlist.playlistName, videoId: videoId },
      });
      toast.success("Video Removed from Playlist");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-screen-lg mx-auto mt-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full mt-10">
        <div className="aspect-w-16 aspect-h-9">
          <VideoLibrary video={video} />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <div className="p-2">
            <h2 className="text-xl font-semibold">{video.title}</h2>
          </div>
          <div className="flex flex-wrap space-x-2 mt-2 sm:mt-0">
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
            <Button
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
              onClick={handleShare}
            >
              <ShareIcon />
            </Button>
            <Button
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
              onClick={handleAddToPlaylist}
            >
              <PlaylistAddIcon />
            </Button>
          </div>
        </div>
        <div className="flex flex-col text-gray-700 mt-4">
          <div className="flex flex-col justify-between w-full">
            <div className="h-auto w-full p-2 mt-4">
              <p>{video.description}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {state.playlists.length > 0 && (
          <>
            <h2 className="text-gray-700 mb-2">Add to Playlist</h2>
            <div className=" flex  flex-col w-68 h-60  border border-gray-700 rounded overflow-y-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200 scrollbar-thin">
              {state.playlists.map((playlist) => {
                const isVideoPresent = playlist.videos.some(
                  (video) => video.id === videoId
                );
                return (
                  <div key={playlist.id}>
                    <label className="flex gap-1 justify-start items-center ml-2 h-6">
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        checked={isVideoPresent}
                        onChange={(event) => {
                          checkboxHandler(event, playlist);
                        }}
                      />
                      {playlist.playlistName}
                    </label>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {/* <div className=" flex  flex-col w-68 h-60 border rounded bg-white border-red-400 shadow-lg overflow-y-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-gray-200 scrollbar-thin">
          {state.playlists.map((playlist) => {
            const isVideoPresent = playlist.videos.some(
              (video) => video.id === videoId
            );
            return (
              <div key={playlist.id}>
                <label className="flex gap-1 justify-start items-center ml-2 h-6">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={isVideoPresent}
                    onChange={(event) => {
                      checkboxHandler(event, playlist);
                    }}
                  />
                  {playlist.playlistName}
                </label>
              </div>
            );
          })}
        </div>  */}

        <div className="flex flex-col">
          <label className="text-gray-700 mb-2">Create Playlist</label>
          <input
            type="text"
            className="mb-4 p-2 border border-gray-700 rounded"
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={(event) => setPlaylistName(event.target.value)}
          />
          <Button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
            onClick={() => nameForSinglePlaylistCreate()}
          >
            Create
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export { VideoDetails };
