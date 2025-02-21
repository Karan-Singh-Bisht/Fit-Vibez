import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFinalActivityCount } from "../state/Ai/AiSlice";

const Pushup = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [finalCount, setFinalCount] = useState(0);

  useEffect(() => {
    // Listen for messages from the iframe
    const handleMessage = (event) => {
      if (event.data?.count !== undefined) {
        const newCount = event.data?.count;
        setCount(newCount);
        if (event.data?.final) {
          setFinalCount(newCount);
          dispatch(setFinalActivityCount(newCount));
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="/pushup.html"
        width="100%"
        height="100%"
        title="Pushup Page"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default Pushup;
