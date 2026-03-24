import React from "react";
import { toast } from "react-toastify";
import { Button } from "../../component/index-component";
import { useNavigate, Link } from "react-router-dom";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import DeleteIcon from "@mui/icons-material/Delete";

function Playlist() {
  const navigate = useNavigate();
  const { state, dispatch } = useVideo();

  function handleDeleteAll() {
    dispatch({ type: "CLEAR_PLAYLISTS" });
    toast.success("All Playlists Removed");
  }

  return (
    <div className="page-shell">
      <div className="mx-auto w-full max-w-[1680px]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="section-headline">Playlists</h1>
            <p className="muted-text mt-1">{state.playlists.length} playlists</p>
          </div>
          {state.playlists.length > 0 ? (
            <Button
              onClick={handleDeleteAll}
              className="border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
            >
              Delete all
            </Button>
          ) : null}
        </div>

        {state.playlists.length === 0 ? (
          <div className="surface-card mx-auto flex w-full max-w-xl flex-col items-center gap-4 p-8 text-center">
              <h2 className="text-lg text-slate-100">
                Your don't have any playlist.
              </h2>
              <Button
                onClick={() => navigate("/")}
                className="bg-blue-500 text-slate-950 hover:bg-blue-400"
              >
                Watch Now
              </Button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {state.playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="surface-card flex min-h-44 flex-col overflow-hidden"
                >
                  <div className="h-24 bg-slate-800 relative">
                    <Link
                      to={`/playlistDetail/${playlist.id}`}
                      className="block h-full"
                    >
                      <div
                        className="h-full bg-cover bg-center opacity-40"
                        style={{
                          backgroundImage: `url(${
                            playlist.videos[0]?.thumbnail ||
                            "default-thumbnail.jpg"
                          })`,
                        }}
                      ></div>
                    </Link>
                  </div>
                  <div className="flex flex-1 items-center justify-between p-4">
                    <h3 className="text-base font-semibold text-slate-100">
                      {playlist.playlistName}
                    </h3>
                    <Button
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_PLAYLIST",
                          payload: playlist.id,
                        });
                        toast.success("Playlist Removed");
                      }}
                      className="h-11 w-11 rounded-lg border border-slate-700 bg-slate-900 px-0 py-0 text-slate-100 hover:bg-slate-800"
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { Playlist };
