import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_ENDPOINT } from "../const/api";
import { setDownloadUrl, setMp3 } from "../modules/slice";

import MidiIcon from "../images/midi_icon.png";
import WavIcon from "../images/wav_icon.png";
// import Mp3Icon from "../images/mp3_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import Div100vh from "react-div-100vh";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [midi, setMidi] = useState(null);
  const [fileName, setFileName] = useState("ファイルが未選択です");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const iconStyle = { fontSize: "10vw" };

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
      setMidi(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !["audio/mid", "audio/midi", "audio/x-midi"].includes(
        midi.type.toLowerCase()
      )
    ) {
      setErrorMessage("MIDIファイルを選択して下さい。");
      setMidi(void 0);
      setFileName("ファイルが未選択です。");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("midi", midi);

    let res;
    try {
      res = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        setErrorMessage("変換に失敗しました、ごめんなさい。");
        return;
      }
      const blob = await res.blob();
      const reader = new FileReader();

      // base64 encode
      reader.readAsDataURL(blob);
      reader.onload = (e) => {
        const mp3Data = e.target.result;
        if (mp3Data) {
          dispatch(setMp3(mp3Data));
          dispatch(setDownloadUrl(URL.createObjectURL(blob)));
          history.push("/player");
        }
      };
      reader.onerror = (err) => {
        console.error(err);
        setErrorMessage("変換に失敗しました、ごめんなさい。");
      };
    } catch (error) {
      setErrorMessage("変換に失敗しました、ごめんなさい。");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Div100vh>
      <div className={`modal ${errorMessage ? "is-active" : ""}`}>
        <div className="modal-background" onClick={() => setErrorMessage("")} />
        <div className="modal-content" onClick={() => setErrorMessage("")}>
          <div className="notification is-danger">{errorMessage}</div>
        </div>
        {/* <button
          className="modal-close is-large"
          onClick={() => setErrorMessage("")}
        /> */}
      </div>

      <div className="hero is-small pt-6">
        <div className="hero-body has-text-centered">
          <h1 className="title">絶対音感を体験できるアプリ</h1>
          <h2 className="subtitle">
            気になるあの音を
            <span className="has-text-info">ドレミ</span>で
          </h2>
        </div>
      </div>
      <div className="section">
        <div className="container py-6">
          <div className="is-flex is-justify-content-space-around is-align-items-center">
            <img src={MidiIcon} width="30%" alt="midiファイルのアイコン" />
            <FontAwesomeIcon icon={faArrowRight} style={iconStyle} />
            {/* <img src={Mp3Icon} width="30%" alt="mp3ファイルのアイコン" /> */}
            <img src={WavIcon} width="30%" alt="wavファイルのアイコン" />
          </div>
        </div>
        <form className="has-text-centered" onSubmit={handleSubmit}>
          <div className="field py-5">
            <div className="file is-centered is-boxed  has-name">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  accept="audio/midi, audio/x-midi"
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <FontAwesomeIcon icon={faUpload} />
                  </span>
                  <span className="file-label">MIDIファイルを選択</span>
                </span>
                <span className="file-name">{fileName}</span>
              </label>
            </div>
          </div>
          <div className="field py-5">
            <button
              className={`button is-info is-large is-rounded ${
                isLoading && "is-loading"
              }`}
              disabled={!midi}
              onClick={() => setIsLoading(true)}
            >
              変換
            </button>
          </div>
        </form>
      </div>
    </Div100vh>
  );
};

export default Home;
