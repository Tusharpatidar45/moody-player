import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

function MoodDetector({ setSongs }) {
  const videoRef = useRef();
  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = stream;
  };
  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");

    startVideo();
  };
  useEffect(() => {
    loadModels();
  }, []);

  const detectMood = async () => {
    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    if (!detections) {
      alert(
        "No face detected. Please ensure your face is visible to the camera.",
      );
      return;
    }
    if (detections) {
      const expressions = detections.expressions;
      const moodDetected = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b,
      );

      axios
        .get(`http://localhost:3000/songs?mood=${moodDetected}`)
        .then((response) => {
          setSongs(response.data.songs);
        })
        .catch((error) => {
          console.error("Error fetching songs:", error);
        });
    }
  };

  return (
    <>
      <div>
        <div>
          <h1 className="text-3xl font-bold px-10 py-5">Moody Player</h1>
        </div>
        <h1 className="text-2xl font-bold px-20 py-5 ">Live Mood Detection</h1>
        <div className="flex items-top">
          <video
            className="bg-gray-500 mx-20  rounded-2xl h-full"
            ref={videoRef}
            autoPlay
            muted
            width="500"
            height="300"
          />
          <div>
            <h1 className="text-3xl font-bold  ">Live Mood Detection</h1>
            <p className="text-lg w-96 mt-5">
              your current mood is being analyzed in real time . Enjoy music
              tailored to your feelings.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-5 cursor-pointer hover:bg-blue-600 transition-colors duration-300"
              onClick={() => {
                detectMood();
              }}
            >
              Detect Mood
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoodDetector;
