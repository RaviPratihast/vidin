import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { useAuth } from "../../Context/Auth-Context/auth-context";
import { checkingWatchLater } from "../../Utilities/checkingWatchLater";
import { Button, Modal, VideoLibrary } from "../../component/index-component";

import { youLikeIt } from "../../Utilities/youLikeIt";
import ShareIcon from "@mui/icons-material/Share";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

function VideoDetails() {
  const { videoId } = useParams();
  const { stateAuth } = useAuth();
  const { state, dispatch } = useVideo();
  const navigate = useNavigate();
  const video = state.initialVideo.find((video) => video.id === videoId);

  const [playlistName, setPlaylistName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!video) {
    return <div className="page-shell">Video not found.</div>;
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
    <div className="page-shell">
      <div className="mx-auto w-full max-w-5xl">
        <div className="aspect-w-16 aspect-h-9">
          <VideoLibrary video={video} />
        </div>
        <div className="mt-4 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <div className="px-1">
            <h2 className="text-xl font-semibold text-slate-100">{video.title}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              className={`${
                isVideoLiked
                  ? "border border-blue-300 bg-blue-500/20 text-blue-100"
                  : "border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
              }`}
              onClick={() =>
                stateAuth.loggedIn
                  ? isVideoLiked
                    ? (dispatch({
                        type: "REMOVE_FROM_LIKED",
                        payload: video,
                      }),
                      toast.success("Removed from Liked"))
                    : (dispatch({ type: "ADD_TO_LIKED", payload: video }),
                      toast.success("Added to Liked"))
                  : navigate("/login")
              }
            >
              Like
            </Button>
            <Button
              className={`${
                isVideoPresentInWatchLater
                  ? "border border-blue-300 bg-blue-500/20 text-blue-100"
                  : "border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
              }`}
              onClick={() =>
                stateAuth.loggedIn
                  ? isVideoPresentInWatchLater
                    ? (dispatch({
                        type: "REMOVE_FROM_WATCH_LATER",
                        payload: video,
                      }),
                      toast.success("Removed from Watch Later"))
                    : (dispatch({ type: "ADD_TO_WATCH_LATER", payload: video }),
                      toast.success("Added to Watch Later"))
                  : navigate("/login")
              }
            >
              Watch Later
            </Button>
            <Button
              className="border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
              onClick={handleShare}
            >
              <ShareIcon />
            </Button>
            <Button
              className="border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
              onClick={() =>
                stateAuth.loggedIn ? handleAddToPlaylist() : navigate("/login")
              }
            >
              <PlaylistAddIcon />
            </Button>
          </div>
        </div>
        <div className="mt-4 flex flex-col text-slate-300">
          <div className="flex w-full flex-col justify-between">
            <div className="surface-card h-auto w-full p-4">
              <p>{video.description}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {state.playlists.length > 0 && (
          <>
            <h2 className="mb-2 text-slate-100">Add to Playlist</h2>
            <div className="flex h-60 flex-col overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 p-2">
              {state.playlists.map((playlist) => {
                const isVideoPresent = playlist.videos.some(
                  (video) => video.id === videoId
                );
                return (
                  <div key={playlist.id}>
                    <label className="ml-2 flex h-8 items-center justify-start gap-2 text-slate-200">
                      <input
                        type="checkbox"
                        className="h-4 w-4 cursor-pointer accent-blue-500"
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
        

        <div className="flex flex-col">
          <label className="mb-2 text-slate-200">Create Playlist</label>
          <input
            type="text"
            className="mb-4 rounded-lg border border-slate-700 bg-slate-900 p-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-blue-400"
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={(event) => setPlaylistName(event.target.value)}
          />
          <Button
            className="bg-blue-500 text-slate-950 hover:bg-blue-400"
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
