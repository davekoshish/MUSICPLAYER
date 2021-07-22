import { React, useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/App.scss";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {
  const handlertimecontrol = (e) => {
    const duration = e.target.duration;
    const current = e.target.currentTime;
    //calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );
    setsonginfo({
      ...songinfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animationPercentage,
    });
  };
  //by default we are setting the songinfo current time and duration be 0. dont put null here or it will give error
  const [songinfo, setsonginfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data()); //songs is a variable having deault value as data.   and the object having bulk of data
  const [currentSong, setcurrentSong] = useState(songs[6]); //index of object  or array is been asked
  const [isPlaying, setisPlaying] = useState(false); //by default we are giving isPlaying as false . (to know if a song is playing or not)
  const [libraryStatus, setlibraryStatus] = useState(false);
  //sendingprop1 is just a keywords using which we can acess the propeties .
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying) audioRef.current.play();
  };
  return (
    <div className={`App ${libraryStatus?'library-active':""}`}>
      <Nav libraryStatus={libraryStatus} setlibraryStatus={setlibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        setSongs={setSongs}
        songs={songs}
        songinfo={songinfo}
        setsonginfo={setsonginfo}
        audioRef={audioRef}
        currentSong={currentSong}
        setcurrentSong={setcurrentSong}
        isPlaying={isPlaying}
        setisPlaying={setisPlaying}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setcurrentSong={setcurrentSong}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
        isPlaying={isPlaying}
      />
      <audio
        //this audio tag is important in our whole app.
        onTimeUpdate={handlertimecontrol}
        onLoadedMetadata={handlertimecontrol}
        ref={audioRef}
        //here the source we have to pass. then it will create all the other properties by its own .
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
