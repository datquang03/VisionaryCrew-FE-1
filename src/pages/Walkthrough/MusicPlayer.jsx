import React, { useEffect, useRef } from "react";

const MusicPlayer = ({ isMuted, shouldPlay }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && shouldPlay) {
      // Play or pause based on isMuted value
      const action = isMuted ? "pauseVideo" : "playVideo";
      try {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: action,
            args: [],
          }),
          "*"
        );
      } catch (error) {
        console.error("Failed to send postMessage:", error);
      }
    }
  }, [isMuted, shouldPlay]); // Effect runs when shouldPlay or isMuted changes

  useEffect(() => {
    const handleMessage = (event) => {
      // Handle both string and object data from YouTube API
      let data = event.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch (error) {
          console.error("Failed to parse YouTube event data:", error);
          return;
        }
      }

      // If the video ends and it's not muted, it will restart the video
      if (
        data.event === "onStateChange" &&
        data.info === 0 &&
        !isMuted &&
        shouldPlay
      ) {
        const iframe = iframeRef.current;
        if (iframe) {
          try {
            iframe.contentWindow.postMessage(
              JSON.stringify({
                event: "command",
                func: "playVideo",
                args: [],
              }),
              "*"
            );
          } catch (error) {
            console.error("Failed to loop video:", error);
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isMuted, shouldPlay]);

  // Ensure music plays automatically when the page loads
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && shouldPlay && !isMuted) {
      try {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "playVideo",
            args: [],
          }),
          "*"
        );
      } catch (error) {
        console.error("Failed to send postMessage:", error);
      }
    }
  }, [shouldPlay, isMuted]); // Ensure the video plays as soon as the conditions are met

  return (
    <iframe
      ref={iframeRef}
      width="0"
      height="0"
      src="https://www.youtube.com/embed/f0f0gjjRgsQ?enablejsapi=1&autoplay=1&loop=1&controls=0&playlist=f0f0gjjRgsQ"
      style={{ display: "none" }}
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  );
};

export default MusicPlayer;
