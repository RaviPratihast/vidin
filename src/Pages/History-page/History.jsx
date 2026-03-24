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
    <div className="page-shell">
      <div className="mx-auto w-full max-w-[1680px]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="section-headline">Watch history</h1>
            <p className="muted-text mt-1">{state.history.length} watched videos</p>
          </div>
          {state.history.length > 0 ? (
            <Button
              onClick={handleDeleteAll}
              className="border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
            >
              Delete all
            </Button>
          ) : null}
        </div>

        {state.history.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {state.history.map((video) => (
              <div key={video.id} className="relative">
                <VideoCard video={video} />
                <Button
                  className="absolute right-3 top-3 h-11 w-11 rounded-lg border border-slate-700 bg-slate-950/90 px-0 py-0 text-slate-100 hover:bg-slate-800"
                  onClick={() => handleDeleteVideo(video.id)}
                >
                  <DeleteIcon />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="surface-card mx-auto flex w-full max-w-xl flex-col items-center gap-4 p-8 text-center">
              <h2 className="text-lg text-slate-100">
                Looks like you haven't watched anything yet.
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

export { History };
