import { React} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";


const Player = ({
  songs,
  setSongs,
  setsonginfo,
  songinfo,
  audioRef,
  currentSong,
  isPlaying,
  setisPlaying,
  setcurrentSong,
  
}) => {
 const activeLibraryHandler =(nextPrev)=>{
  const newSongs = songs.map((song) => {
    if (song.id === nextPrev.id) {
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
 }

  //this is a reference of audio we are using so that it can be accessed in javascript

  //playerhandler is a function that do the pause and play . if song is playing then it will pause . and make isPlaying reverse of isplaying
  const playerhandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setisPlaying(!isPlaying);
    }
    //when we start the song its always false soo now . this else will make it set Isplaying true.
    else {
      audioRef.current.play();
      setisPlaying(!isPlaying);
    }
  };
  //this funtion will fetch the duration of the song and the instant of time we are in the song.
  //and also it is setting the songinfo's currentTime to current and duration to duration.
  //this funtion is making the time more readable.
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  //draghandler is making the songs dragable so that we can drag it and skip-forward and backward.
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setsonginfo({ ...songinfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      //we put it here the modules casue when the songs reaches the last index it will gonna refresh to 0 index.
     await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
     activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      //we put it here the modules casue when the songs reaches the last index it will gonna refresh to 0 index.
      if ((currentIndex - 1) % songs.length === -1) {
        await setcurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if(isPlaying) audioRef.current.play();
        return;
      }
     await setcurrentSong(songs[(currentIndex - 1) % songs.length]);
     activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if(isPlaying) audioRef.current.play();
  };
  //add the styles
  const trackAnim = {
    transform: `translateX(${songinfo.animationPercentage}%)`
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songinfo.currentTime)}</p>
        <div style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
          <input
            min={0}
            max={songinfo.duration || 0}
            onChange={dragHandler}
            value={songinfo.currentTime}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songinfo.duration ? getTime(songinfo.duration) : "0:00"} </p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playerhandler}
          className="play"
          size="2x"
          //the icon will change if isplaying true then faPause will be shown if not the faplay.
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
