import { useDispatch } from "react-redux";
import { API_ENDPOINT } from "../const/api";
import { setDownloadUrl, setMp3 } from "../modules/slice";

import MidiIcon from "../images/midi_icon.png";
import Mp3Icon from "../images/mp3_icon.png";
// import { arrowForwardOutline, share, shareOutline } from "ionicons/icons";

const Home = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.midi.files[0];

    if (!file) {
      alert("ファイルを入力してください");
      return;
    }

    const formData = new FormData();
    formData.append("midi", file);

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
      }
    };
    reader.onerror = (err) => {
      console.error(err);
    };
  };

  return (
    <div className="title">
      hello
      {/* <h1
        style={{ fontSize: "36px", padding: "70px 0 0 0" }}
        className="ion-text-center"
      >
        気になるあの音を
        <br />
        <IonText color="primary">ドレミ</IonText>で
      </h1>

      <div
        style={{
          padding: "20px 60px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <img src={MidiIcon} width="30%" alt="midiファイルのアイコン" />
        <IonIcon icon={arrowForwardOutline} size="large" />
        <img src={Mp3Icon} width="30%" alt="mp3ファイルのアイコン" />
      </div>

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
  );
};

export default Home;
