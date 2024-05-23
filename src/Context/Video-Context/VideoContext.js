import { createContext, useContext, useReducer } from "react";
import videos from "../../Data/UserData";
import VideoReducer from "../../Reducers/VideoReducer";

const VideoContext = createContext(null);
const useVideo = () => useContext(VideoContext);

let initialState = {
  originalData: videos,
  initialVideo: videos,
  liked: [],
  watchLater: [],
  playlists: [],
  history: [],
};

const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(VideoReducer, initialState);
  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

export { VideoProvider, useVideo };
