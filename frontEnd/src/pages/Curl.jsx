import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { curlTracker, setFinalActivityCount } from "../state/Ai/AiSlice";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "../components/Loading";

const Curl = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [finalCount, setFinalCount] = useState(0);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Add loading state
  const { address } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
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
        setSessionEnded(true);
        dispatch(setFinalActivityCount(event.data.finalCount));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch]);

  useEffect(() => {
    const trackCurls = async () => {
      if (finalCount < 5) {
        toast.error("Curl should be more than 5");
        return;
      }
      if (sessionEnded) {
        setLoading(true); // ✅ Show loading state
        try {
          const res = await dispatch(
            curlTracker({ userAddress: address, curlCount: finalCount })
          );
          setCount(0);
          setSessionEnded(false);
          setLoading(false); // ✅ Hide loading state

          if (res.payload.status === 200) {
            navigate("/");
            toast.success("Payment successful");
          }
        } catch (error) {
          console.error("Error tracking push-ups:", error);
          setLoading(false); // ✅ Ensure loading stops on error
          toast.error("Error tracking push-ups. Please try again.");
        }
      }
    };

    trackCurls();
  }, [sessionEnded, finalCount, dispatch]);

  return (
    <div style={{ width: "100%", height: "100vh", textAlign: "center" }}>
      {loading && <Loading />} {/* ✅ Show loader while API call runs */}
      <iframe
        src="/curl.html"
        width="100%"
        height="80%"
        title="Curl Page"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default Curl;
