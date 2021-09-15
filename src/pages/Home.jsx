import { useState } from "react";
import { API_ENDPOINT } from "../const/api";
import AudioPlayer from "react-h5-audio-player";

import MidiIcon from "../images/midi_icon.png";
import WavIcon from "../images/wav_icon.png";
import Title from "../images/title_logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faUpload,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [midi, setMidi] = useState(null);
  const [uploadFileName, setUploadFileName] = useState("ファイルが未選択です");
  const [downloadFileName, setDownloadFileName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mp3Data, setMp3Data] = useState(null);
  const [email, setEmail] = useState("");

  const iconStyle = { fontSize: "10vw" };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUploadFileName(file.name);
      setMidi(e.target.files[0]);
    }
  };

  let res;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !["audio/mid", "audio/midi", "audio/x-midi"].includes(
        midi.type.toLowerCase()
      )
    ) {
      setErrorMessage("MIDIファイルを選択して下さい。");
      setMidi(void 0);
      setUploadFileName("ファイルが未選択です。");
      setIsLoading(false);
      return;
    }
    try {
      if (
        !email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        ) &&
        email !== ""
      ) {
        setErrorMessage("有効なメールアドレスを入力してください。");
        return;
      }

      const formData = new FormData();
      formData.append("midi", midi);
      if (email === "") {
        formData.append("email", null);
        console.log("ok");
      } else {
        formData.append("email", email);
      }

      res = await fetch(API_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setErrorMessage("変換に失敗しました、ごめんなさい。");
        return;
      } else if (email !== "") {
        setSuccessMessage("生成結果の送信をお待ちください。");
        resetFormState();
      } else {
        const blob = await res.blob();
        const reader = new FileReader();

        // base64 encode
        reader.readAsDataURL(blob);
        reader.onload = (e) => {
          setMp3Data(e.target.result);
          setDownloadUrl(URL.createObjectURL(blob));
        };
        reader.onerror = (err) => {
          console.error(err);
          setErrorMessage("変換に失敗しました、ごめんなさい。");
        };
      }
    } catch (error) {
      setErrorMessage("変換に失敗しました、ごめんなさい。");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const resetFormState = () => {
    setMidi(null);
    setUploadFileName("ファイルが未選択です");
    setDownloadFileName("");
    setDownloadUrl("");
    setIsLoading(false);
    setMp3Data(null);
    setEmail("");
  };

  const getValidFileName = (input) => {
    return (
      (input.replaceAll(".", "") ? input.replaceAll(".", "") : "zettai_onkan") +
      ".wav"
    );
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <section className="hero is-primary">
        <div className="hero-head">
          <nav className="navbar">
            <img src={Title} alt="title" />
          </nav>
        </div>
      </section>
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
      <div className={`modal ${successMessage ? "is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={() => setSuccessMessage("")}
        />
        <div className="modal-content" onClick={() => setSuccessMessage("")}>
          <div className="notification is-success">{successMessage}</div>
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
            <img src={MidiIcon} width="25%" alt="midiファイルのアイコン" />
            <FontAwesomeIcon icon={faArrowRight} style={iconStyle} />
            {/* <img src={Mp3Icon} width="30%" alt="mp3ファイルのアイコン" /> */}
            <img src={WavIcon} width="25%" alt="wavファイルのアイコン" />
          </div>
        </div>

        {(() => {
          if (mp3Data) {
            return (
              <div className="section">
                <div className="container">
                  <div className="field has-addons py-4">
                    <div className="control is-expanded">
                      <input
                        className="input"
                        type="text"
                        placeholder="ファイル名を入力"
                        onChange={(e) => setDownloadFileName(e.target.value)}
                        value={downloadFileName}
                      />
                    </div>
                    <div className="control">
                      <a
                        className="button is-info is-outlined is-round"
                        download={getValidFileName(downloadFileName)}
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
                    src={mp3Data}
                    // src={audioBuffer}
                    // onPlay={(e) => console.log("onPlay")}
                  />
                </div>
                <div className="field py-6 has-text-centered">
                  <button
                    className="button is-info is-large is-rounded"
                    onClick={resetFormState}
                  >
                    続けて変換
                  </button>
                </div>
              </div>
            );
          } else {
            return (
              <form className="has-text-centered" onSubmit={handleSubmit}>
                <div className="field py-5">
                  <div className="file is-centered is-boxed has-name">
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
                      <span className="file-name">{uploadFileName}</span>
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
                          placeholder="example@mail.com"
                          onChange={handleChangeEmail}
                          value={email}
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
            );
          }
        })()}
      </div>
    </div>
  );
};

export default Home;
