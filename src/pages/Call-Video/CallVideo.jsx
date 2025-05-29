// src/components/CallVideo.jsx
import React, { useEffect } from "react";
import { gsap } from "gsap";
import VideoCall from "./components/VideoCallFunc";
import { BackgroundLines } from "../../components/3D_Threejs/BackgroundLines";

const CallVideo = () => {
  useEffect(() => {
    gsap.fromTo(
      ".call-video-header",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <BackgroundLines className="z-50 linear-gradient from-blue-500 to-cyan-900">
      <div className="call-video-container p-4 sm:p-6 bg-gray-100 min-h-screen">
        <h1 className="call-video-header text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          WebRTC Video Call
        </h1>
        <VideoCall roomId="room-1" />
      </div>
    </BackgroundLines>
  );
};

export default CallVideo;
