import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { pushUpTracker, setFinalActivityCount } from "../state/Ai/AiSlice";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../components/Loading";

const Pushup = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [finalCount, setFinalCount] = useState(0);
  const [sessionEnded, setSessionEnded] = useState(false); // Track session state
  const [loading, setLoading] = useState(false); // Loading state
  const { address } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for messages from the iframe
    const handleMessage = (event) => {
      if (event.data?.count !== undefined) {
        setCount(event.data.count);
      }

      if (event.data?.final) {
        setFinalCount(event.data.count);
        dispatch(setFinalActivityCount(event.data.count));
      }

      if (event.data?.action === "stop") {
        setFinalCount(event.data.finalCount);
        setSessionEnded(true); // Update session state
        dispatch(setFinalActivityCount(event.data.finalCount));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch]);

  // Use useEffect to trigger dispatch when session ends
  useEffect(() => {
    const trackPushUps = async () => {
      if (finalCount < 5) {
        toast.error("Pushups should be more than 5");
        return;
      }
      if (sessionEnded) {
        setLoading(true);
        try {
          const res = await dispatch(
            pushUpTracker({ userAddress: address, pushUpCount: finalCount })
          );
          setCount(0);
          setSessionEnded(false);
          if (res.status === 200) {
            navigate("/");
          }
        } catch (error) {
          console.error("Error tracking push-ups:", error);
          toast.error("Error tracking push-ups. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    trackPushUps();
  }, [sessionEnded, finalCount, dispatch, address, navigate]);

  return (
    <div style={{ width: "100%", height: "100vh", textAlign: "center" }}>
      {loading && <Loading />}
      <iframe
        src="/pushup.html"
        width="100%"
        height="80%"
        title="Pushup Page"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default Pushup;
