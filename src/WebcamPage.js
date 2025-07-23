import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { storage, auth } from "./firebase";
import { ref, uploadString } from "firebase/storage";

function WebcamPage() {
  const webcamRef = useRef(null);
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    if (!auth.currentUser) {
      setMessage("❌ You must be logged in to save photos.");
      return;
    }

    setMessage("");
    setCountdown(3);
    let current = 3;

    const interval = setInterval(() => {
      current -= 1;
      setCountdown(current);
      if (current === 0) {
        clearInterval(interval);
        capture(); // take photo after countdown ends
      }
    }, 1000);
  };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const userId = auth.currentUser.uid;
    const timestamp = new Date().toISOString();
    const imageRef = ref(storage, `photos/${userId}/${timestamp}.jpg`);

    try {
      await uploadString(imageRef, imageSrc, "data_url");
      setMessage("✅ Photo saved!");
    } catch (error) {
      setMessage("❌ Failed to save photo: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Take Your Photo</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
      />
      <br />
      {countdown > 0 && <h3>📸 {countdown}</h3>}
      <button onClick={startCountdown}>Start Timer & Save Photo</button>
      <p>{message}</p>
    </div>
  );
}

export default WebcamPage;
