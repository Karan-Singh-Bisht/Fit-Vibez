import React, { useEffect, useRef, useState } from "react";

const PoseDetection = () => {
  const videoRef = useRef(null);
  const [count, setCount] = useState(0);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [finalCount, setFinalCount] = useState(0);
  let frameCount = 0;
  const frameSkip = 5; // Send every 5th frame to reduce load

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const resetSession = async () => {
      try {
        await fetch(
          "https://pushup-poseestimation-2.onrender.com/reset_session/",
          {
            method: "POST",
          }
        );
        console.log("Session reset successfully");
      } catch (error) {
        console.error("Error resetting session:", error);
      }
    };

    resetSession();
    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const sendFrame = async () => {
      frameCount++;
      if (frameCount % frameSkip !== 0) return; // Skip frames for optimization

      if (!videoRef.current) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 320;
      canvas.height = 240;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg", 0.5).split(",")[1];

      try {
        const response = await fetch(
          "https://pushup-poseestimation-2.onrender.com/process_frame/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: imageData }),
          }
        );

        const data = await response.json();
        setCount(data.count);

        if (data.final) {
          setSessionEnded(true);
          setFinalCount(data.count);
          if (videoRef.current?.srcObject) {
            videoRef.current.srcObject
              .getTracks()
              .forEach((track) => track.stop());
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const intervalId = setInterval(sendFrame, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Real-time Pose Detection</h1>
      <video ref={videoRef} autoPlay playsInline></video>
      <p>
        Count: <span>{count}</span>
      </p>
      {sessionEnded && (
        <p style={{ color: "red" }}>
          Session Ended. Final Count: <span>{finalCount}</span>
        </p>
      )}
    </div>
  );
};

export default PoseDetection;
