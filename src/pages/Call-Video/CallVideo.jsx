// src/components/CallVideo.jsx
import React, { useEffect } from "react";
import { gsap } from "gsap";
import VideoCall from "./components/VideoCallFunc";

const CallVideo = () => {
  useEffect(() => {
    gsap.fromTo(
      ".call-video-header",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="call-video-container p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="call-video-header text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
        WebRTC Video Call
      </h1>
      <VideoCall roomId="room-1" />
    </div>
  );
};

export default CallVideo;
