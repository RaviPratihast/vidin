import React from "react";
import { toast } from "react-toastify";
import { Button } from "../../component/index-component";
import { useNavigate, Link } from "react-router-dom";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import DeleteIcon from "@mui/icons-material/Delete";

function Playlist() {
  const navigate = useNavigate();
  const { state, dispatch } = useVideo();

  function handleClick() {
    navigate("/explore");
  }

  function handleDeleteAll() {
    dispatch({ type: "CLEAR_PLAYLISTS" });
    toast.success("All Playlists Removed");
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* playlist length: items are there in the page */}
        <div className="shadow-lg h-20 sm:h-24 w-full sm:w-60 flex flex-col justify-center items-center border border-gray-700 rounded-md mb-4 sm:mb-8">
          <h3 className="text-gray-700 text-center">
            Playlists: {state.playlists.length}
          </h3>
        </div>

        {state.playlists.length === 0 ? (
          <div className="flex justify-center items-center w-full px-4 sm:px-6 lg:px-8">
            <div className="border shadow-lg h-auto sm:h-60 w-full max-w-md p-8 sm:p-20 flex flex-col justify-center items-center gap-4 sm:gap-2 rounded-md border-gray-700">
              <h2 className="text-lg text-gray-700 text-center">
                Your playlist is empty.
              </h2>
              <Button
                onClick={() => navigate("/explore")}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Watch Now
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-end mb-4">
              <Button
                onClick={handleDeleteAll}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Delete All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {state.playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-white rounded overflow-hidden shadow-lg flex flex-col h-40"
                >
                  <div className="bg-gray-700 h-1/2 relative">
                    <Link
                      to={`/playlistDetail/${playlist.id}`}
                      className="block h-full"
                    >
                      <div
                        className="h-full opacity-50 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${
                            playlist.videos[0]?.thumbnail ||
                            "default-thumbnail.jpg"
                          })`,
                        }}
                      >
                        {/* Placeholder for the faded thumbnail */}
                      </div>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-700 text-white">
                    <h3 className="text-base">{playlist.playlistName}</h3>
                    <Button
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_PLAYLIST",
                          payload: playlist.id,
                        });
                        toast.success("Playlist Removed");
                      }}
                      className="text-white focus:outline-none"
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
