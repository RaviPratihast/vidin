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
      <div className="page-shell flex items-center justify-center">
        <h2 className="text-lg text-slate-200">Playlist not found!</h2>
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
    <div className="page-shell">
      <div className="mx-auto w-full max-w-[1680px]">
        <h2 className="section-headline mb-4">
          {playlist.playlistName}
        </h2>
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleClearVideos}
            className="border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
          >
            Delete All
          </Button>
        </div>
        {playlist.videos.length === 0 ? (
          <div className="surface-card mx-auto flex max-w-xl flex-col items-center gap-4 p-8 text-center">
              <h2 className="text-lg text-slate-100">
                No videos in this playlist!
              </h2>
              <Link
                to="/"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-blue-400"
              >
                Explore Videos
              </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {playlist.videos.map((video) => (
              <div key={video.id} className="relative">
                <VideoCard video={video} />
                <Button
                  className="absolute right-3 top-3 h-11 w-11 rounded-lg border border-slate-700 bg-slate-950/90 px-0 py-0 text-slate-100 hover:bg-slate-800"
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
