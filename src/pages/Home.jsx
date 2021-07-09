import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_ENDPOINT } from "../const/api";
import { setDownloadUrl, setMp3 } from "../modules/slice";

import MidiIcon from "../images/midi_icon.png";
import Mp3Icon from "../images/mp3_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [midi, setMidi] = useState(null);
  const [fileName, setFileName] = useState("ファイルが未選択です");
  const iconStyle = { fontSize: "10vw" };

  console.log(midi);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
      setMidi(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!midi) {
      alert("ファイルを入力してください");
      return;
    }

    const formData = new FormData();
    formData.append("midi", midi);

    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      body: formData,
    });

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
    };
  };

  return (
    <div>
      <div className="hero is-small pt-5">
        <div className="hero-body has-text-centered">
          <h1 className="title">絶対音感を体験できるアプリ</h1>
          <h2 className="subtitle">
            気になるあの音を
            <span className="has-text-info">ドレミ</span>で
          </h2>
        </div>
      </div>
      <div className="section">
        <div className="container pb-6">
          <div className="is-flex is-justify-content-space-around is-align-items-center">
            <img src={MidiIcon} width="30%" alt="midiファイルのアイコン" />
            <FontAwesomeIcon icon={faArrowRight} style={iconStyle} />
            <img src={Mp3Icon} width="30%" alt="mp3ファイルのアイコン" />
          </div>
        </div>
        <form className="pt-6 has-text-centered" onSubmit={handleSubmit}>
          <div className="field py-5">
            <div className="file is-centered is-boxed  has-name">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="resume"
                  onChange={handleChange}
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
            <button className="button is-info is-outlined">変換</button>
          </div>
        </form>
        {/* 
      <form onSubmit={handleSubmit}>
        <div className="ion-text-center">
          <label style={{ width: "100%", height: "100%" }}>
            <IonIcon
              icon={shareOutline}
              style={{ fontSize: "62px" }}
              size="large"
            />

            <IonInput
              name="midi"
              type="file"
              accept="audio/midi, audio/x-midi"
              id="hello"
              style={{ display: "none" }}
            />
          </label>
        </div>

        <IonButton
          type="submit"
          fill="outline"
          expand="block"
          shape="round"
          size="large"
          style={{ padding: "0 50px" }}
        >
          <IonText color="dark">変換</IonText>
        </IonButton>
      </form> */}
      </div>
    </div>
  );
};

export default Home;
