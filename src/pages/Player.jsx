import AudioPlayer from "react-h5-audio-player";
import { useState } from "react";
import { Link } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";

const Player = () => {
  // const mp3 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  const iconStyle = { fontSize: "3em" };
  const { mp3, downloadUrl } = useSelector((state) => state.app);
  const [fileName, setFileName] = useState("");

  const getValidFileName = (input) => {
    return (
      (input.replaceAll(".", "") ? input.replaceAll(".", "") : "zettai-onkan") +
      ".wav"
    );
  };

  return (
    <div>
      <header>
        <nav className="navbar" role="navigation">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <FontAwesomeIcon icon={faChevronLeft} style={iconStyle} />
            </Link>
          </div>
        </nav>
      </header>
      <div className="section">
        <div className="container">
          <div className="card">
            <div className="card-image">
              <figure className="image is-1by1">
                <img
                  src="https://bulma.io/images/placeholders/1280x960.png"
                  alt="Placeholder"
                />
              </figure>
            </div>
          </div>
          <div className="field has-addons py-4">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="ファイル名を入力"
                // ref={fileNameRef}
                onChange={(e) => setFileName(e.target.value)}
                value={fileName}
              />
            </div>
            <div className="control">
              <a
                className="button is-info is-outlined is-round"
                // onClick={(e) => console.log(fileNameRef.current.value)}
                // download={getValidFileName(fileNameRef.current.value)}
                download={getValidFileName(fileName)}
                href={downloadUrl}
              >
                download
              </a>
            </div>
          </div>
        </div>
        <div className="container">
          <AudioPlayer
            showJumpControls={false}
            // customVolumeControls={[]}
            // autoPlay
            src={mp3}
            // src={audioBuffer}
            // onPlay={(e) => console.log("onPlay")}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
