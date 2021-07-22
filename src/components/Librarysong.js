import React from "react";


export default function librarysong({
  audioRef,
  song,
  songs,
  setcurrentSong,
  id,
  setSongs,
  isPlaying,
}) {
  //this is an indiviual song on the libary section
  const songSelector = async () => {
    const selectedSong = songs.filter((state) => state.id === id);
    await setcurrentSong({ ...selectedSong[0] });
    //Set Active in library
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(newSongs);
    if(isPlaying) audioRef.current.play();
  };

  return (
    <div
      onClick={songSelector}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt="song-cover" src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}
