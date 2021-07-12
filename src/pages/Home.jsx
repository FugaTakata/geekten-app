import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_ENDPOINT } from "../const/api";
import { setDownloadUrl, setMp3 } from "../modules/slice";

import MidiIcon from "../images/midi_icon.png";
import Mp3Icon from "../images/mp3_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faUpload,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [midi, setMidi] = useState(null);
  const [fileName, setFileName] = useState("ファイルが未選択です");
  const initialMessage = { type: null, text: "" };
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const iconStyle = { fontSize: "10vw" };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
      setMidi(e.target.files[0]);
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email.match(/[^\s]+@[^\s]+/)) {
        setMessage({
          type: "danger",
          text: "有効なメールアドレスを入力してください。",
        });
        return;
      }

      const formData = new FormData();
      formData.append("midi", midi);
      formData.append("email", email);

      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: "生成結果の送信をお待ちください。",
        });
      } else {
        setMessage({
          type: "danger",
          text: "変換に失敗しました、ごめんなさい。",
        });
        return;
      }

      // const blob = await res.blob();
      // const reader = new FileReader();

      // // base64 encode
      // reader.readAsDataURL(blob);
      // reader.onload = (e) => {
      //   const mp3Data = e.target.result;
      //   if (mp3Data) {
      //     dispatch(setMp3(mp3Data));
      //     dispatch(setDownloadUrl(URL.createObjectURL(blob)));
      //     history.push("/player");
      //   }
      // };
      // reader.onerror = (err) => {
      //   console.error(err);
      //   setMessage({
      //     type: "danger",
      //     text: "変換に失敗しました、ごめんなさい。",
      //   });
      // };
    } catch (error) {
      console.error(error);
      setMessage({
        type: "danger",
        text: "変換に失敗しました、ごめんなさい。",
      });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className={`modal ${message.text ? "is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={() => setMessage(initialMessage)}
        />
        <div className="modal-content">
          <div className={`notification is-${message.type}`}>
            {message.text}
          </div>
        </div>
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
            <img src={Mp3Icon} width="30%" alt="mp3ファイルのアイコン" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="has-text-centered">
          <div className="field py-5">
            <div className="file is-centered is-boxed  has-name">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="resume"
                  onChange={handleChangeFile}
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
          <div className="columns is-centered">
            <div className="column is-4">
              <div className="field is-one-quarter">
                <label className="label has-text-left">
                  送信先メールアドレス
                </label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    // type="email"
                    type="text"
                    placeholder="example@mail.com"
                    onChange={handleChangeEmail}
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="field py-5">
            <button
              className={`button is-info is-medium is-rounded ${
                isLoading && "is-loading"
              }`}
              disabled={!midi || !email}
              onClick={() => setIsLoading(true)}
            >
              変換
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
