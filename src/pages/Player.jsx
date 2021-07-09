import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import { Link } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-h5-audio-player/lib/styles.css";

const Player = () => {
  const mp3 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  // const audioContextRef = useRef(null);
  // const sourceNodeRef = useRef(null);
  // const [audioBuffer, setAudioBuffer] = useState(null);
  // const [btn, setBtn] = useState("start");
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [time, setTime] = useState(0);
  // useEffect(() => {
  //  audioContextRef.current = new AudioContext();
  // }, []);

  // const handleChangeFile = async (event) => {
  //   const _file = event.target.files[0];
  //   const _audioBuffer = await audioContextRef.current.decodeAudioData(
  //     await _file.arrayBuffer()
  //   );
  //   // setAudioBuffer(_audioBuffer);
  //   setAudioBuffer(new Blob(_audioBuffer));
  // };

  // const handleChangeFile = (e) => {
  //   const file = e.target.files[0];
  //   setAudioBuffer(file);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = (e) => {
  //     setAudioBuffer(e.target.result);
  //   };
  //   reader.onerror = (e) => {
  //     console.error(e);
  //   };
  // };

  // const handleClickPlay = () => {
  //   const sourceNode = sourceNodeRef.current;
  //   if (isPlaying) {
  //     sourceNode.stop();
  //   } else {
  //     sourceNode.start();
  //   }
  //   setIsPlaying((prev) => !prev);
  //   // if (audioContextRef.current.state === "suspended") {
  //   //   setBtn("stop");
  //   //   setIsPlaying(true);
  //   //   audioContextRef.current.resume();
  //   // } else if ("runnning") {
  //   //   setIsPlaying(false);
  //   //   setBtn("start");
  //   //   audioContextRef.current.suspend();
  //   // }
  // };

  // useEffect(() => {
  //   // ソースノード生成 ＋ 音声を設定
  //   sourceNodeRef.current = audioContextRef.current.createBufferSource();
  //   sourceNodeRef.current.buffer = audioBuffer;

  //   sourceNodeRef.current.connect(audioContextRef.current.destination); // 出力先に接続
  //   // sourceNodeRef.current.start();
  //   // audioContextRef.current.suspend();
  // }, [audioBuffer]);
  // // console.log(audioContextRef.current.currentTime);
  // console.log(audioBuffer?.duration);
  // const parseTime = (time) => {
  //   let returnTime;
  //   let second = ("0" + Math.floor(time % 60)).slice(-2);
  //   let minutes = ("0" + Math.floor((time / 60) % 60)).slice(-2);
  //   returnTime = minutes + ":" + second;
  //   return returnTime;
  // };

  return (
    <div>
      <header>
        <nav className="navbar" role="navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
          </div>
        </nav>
      </header>
      <div className="section">
        <div className="container">
          <div className="card">
            <div className="card-image">
              <figure class="image is-3by2">
                <img
                  src="https://bulma.io/images/placeholders/1280x960.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
          </div>
        </div>
        {/* <div className="container">
        <div className="py-4">
          <input
            className="input is-rounded"
            type="text"
            placeholder="mp3ファイル名"
          />
        </div>
      </div> */}
        <div className="container">
          <AudioPlayer
            showJumpControls={false}
            // customVolumeControls={[]}
            // autoPlay
            src={mp3}
            // src={audioBuffer}
            onPlay={(e) => console.log("onPlay")}
            // other props here
          />
        </div>
        <div className="colmuns">
          <form className="py-6 has-text-centered">
            <input
              className="input"
              type="text"
              placeholder="mp3ファイル名"
            ></input>
            <button className="button is-info is-outlined">download</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Player;
