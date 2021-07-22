import React from "react";
import Librarysong from "./Librarysong";

function Library({isPlaying,libraryStatus,setSongs, audioRef, songs, setcurrentSong, id }) {
  return (
    <div className={`library ${libraryStatus ? "active-library":" "}`}>
      <h2> Library</h2>
      <div className="library-songs">
        {/* Here song inside bracket will traverse through all the songs and render the song to librarysong as keyword song */}
        {songs.map((song) => (
          <Librarysong
            song={song}
            songs={songs}
            setcurrentSong={setcurrentSong}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            setSongs={setSongs}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
