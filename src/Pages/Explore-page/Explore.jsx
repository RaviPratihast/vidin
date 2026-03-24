import React from "react";
import { useVideo } from "../../Context/Video-Context/VideoContext";
import { VideoCard } from "../../component/index-component";

const Explore = () => {
  const { state } = useVideo();

  return (
    <div className="page-shell">
      <section className="mx-auto w-full max-w-[1680px]">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="section-headline">Explore videos</h1>
            <p className="muted-text mt-1">Browse trending and curated content.</p>
          </div>
          <span className="muted-text">{state.filteredVideos.length} results</span>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {state.filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
      {state.filteredVideos.length === 0 ? (
        <section className="surface-card mx-auto mt-6 max-w-xl p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-100">No videos found</h2>
          <p className="muted-text mt-2">Try a different keyword from search.</p>
        </section>
      ) : null}
    </div>
  );
};

export { Explore };
