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
    <div className="page-shell">
      <div className="mx-auto w-full max-w-[1680px]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="section-headline">Liked videos</h1>
            <p className="muted-text mt-1">{state.liked.length} liked videos</p>
          </div>
          {state.liked.length > 0 ? (
            <Button
              onClick={handleDeleteAll}
              className="border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
            >
              Delete all
            </Button>
          ) : null}
        </div>

        {state.liked.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {state.liked.map((video) => (
              <div key={video.id} className="relative">
                <VideoCard video={video} />
                <Button
                  className="absolute right-3 top-3 h-11 w-11 rounded-lg border border-slate-700 bg-slate-950/90 px-0 py-0 text-slate-100 hover:bg-slate-800"
                  onClick={() => handleDeleteVideo(video)}
                >
                  <DeleteIcon />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="surface-card mx-auto flex w-full max-w-xl flex-col items-center gap-4 p-8 text-center">
              <h2 className="text-lg text-slate-100">
                Looks like you haven't liked anything yet.
              </h2>
              <Button
                onClick={() => navigate("/")}
                className="bg-blue-500 text-slate-950 hover:bg-blue-400"
              >
                Watch Now
              </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { Liked };
