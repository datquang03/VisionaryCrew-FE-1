import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getDoctors } from "../../../redux/APIs/slices/authSlice";
import { gsap } from "gsap";
import avatar from "../../../assets/defaultAvatar.png";

const VideoCall = ({ roomId }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth || {});
  const {
    doctors = [],
    status: doctorsStatus = "idle",
    error: doctorsError = null,
  } = authState;

  // Refs
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  // State
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [socket, setSocket] = useState(null);

  // Initialize socket and media
  useEffect(() => {
    // Initialize socket
    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
      auth: { token: localStorage.getItem("accessToken") },
    });
    setSocket(newSocket);

    // Initialize media
    const initMedia = async () => {
      try {
        const configuration = {
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        };
        peerConnectionRef.current = new RTCPeerConnection(configuration);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;

        stream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        // WebRTC event handlers
        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate && selectedDoctor && newSocket) {
            newSocket.emit("ice-candidate", {
              target: selectedDoctor._id,
              candidate: event.candidate,
              roomId,
            });
          }
        };

        peerConnectionRef.current.ontrack = (event) => {
          remoteVideoRef.current.srcObject = event.streams[0];
        };
      } catch (err) {
        console.error("Media initialization error:", err);
      }
    };

    initMedia();

    return () => {
      newSocket.disconnect();
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    const handleOffer = async (data) => {
      const { sdp, sender } = data;
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(sdp)
      );
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socket.emit("answer", { sdp: answer, target: sender, roomId });
    };

    const handleAnswer = async ({ sdp }) => {
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(sdp)
      );
    };

    const handleIceCandidate = async ({ candidate }) => {
      try {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      } catch (err) {
        console.error("Error adding ICE candidate:", err);
      }
    };

    const handleUserDisconnected = () => {
      remoteVideoRef.current.srcObject = null;
      setSelectedDoctor(null);
    };

    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleIceCandidate);
    socket.on("user-disconnected", handleUserDisconnected);

    return () => {
      socket.off("offer", handleOffer);
      socket.off("answer", handleAnswer);
      socket.off("ice-candidate", handleIceCandidate);
      socket.off("user-disconnected", handleUserDisconnected);
    };
  }, [socket, roomId]);

  // Fetch doctors
  useEffect(() => {
    if (doctorsStatus === "idle") {
      dispatch(getDoctors());
    }
  }, [dispatch, doctorsStatus]);

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(
      ".video-call-container",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  const startCall = async (doctorId) => {
    const doctor = doctors.find((d) => d._id === doctorId);
    if (!doctor || !peerConnectionRef.current) return;

    setSelectedDoctor(doctor);

    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socket.emit("offer", {
        sdp: offer,
        target: doctorId,
        roomId,
      });
    } catch (err) {
      console.error("Error starting call:", err);
    }
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }

    if (selectedDoctor && socket) {
      socket.emit("user-disconnected", selectedDoctor._id);
    }

    setSelectedDoctor(null);
  };

  const shareScreen = async () => {
    try {
      if (isSharingScreen) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        replaceStream(stream);
        setIsSharingScreen(false);
      } else {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        replaceStream(stream);
        setIsSharingScreen(true);
      }
    } catch (err) {
      console.error("Screen share error:", err);
    }
  };

  const replaceStream = (newStream) => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }

    setLocalStream(newStream);
    localVideoRef.current.srcObject = newStream;

    const senders = peerConnectionRef.current.getSenders();
    senders.forEach((sender) => {
      if (sender.track?.kind === "video") {
        sender.replaceTrack(newStream.getVideoTracks()[0]);
      } else if (sender.track?.kind === "audio") {
        sender.replaceTrack(newStream.getAudioTracks()[0]);
      }
    });
  };

  return (
    <div className="video-call-container max-w-7xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl shadow-xl">
      {/* Doctor selection as icons */}
      <div className="doctor-selection mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Available Doctors
        </h3>

        {doctorsStatus === "loading" && (
          <p className="text-center text-gray-600">Loading doctors...</p>
        )}

        {doctorsStatus === "failed" && (
          <p className="text-center text-red-500">
            Error: {doctorsError || "Failed to load doctors"}
          </p>
        )}

        {doctorsStatus === "succeeded" && (
          <div className="flex flex-wrap gap-4">
            {doctors.length === 0 ? (
              <p className="text-gray-600">No doctors available</p>
            ) : (
              doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all ${
                    selectedDoctor?._id === doctor._id
                      ? "bg-blue-100 border-2 border-blue-500"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  onClick={() => startCall(doctor._id)}
                >
                  <img
                    src={doctor?.avatar || { avatar }}
                    alt={doctor?.username}
                    className="w-16 h-16 rounded-full object-cover mb-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {doctor.username}
                  </span>
                  {selectedDoctor?._id === doctor._id && (
                    <span className="text-xs text-green-600 mt-1">
                      Connected
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Video grid */}
      <div className="video-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="video-wrapper bg-white rounded-xl p-4 shadow-lg">
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            {isSharingScreen ? "Screen Sharing" : "Your Video"}
          </h4>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full rounded-lg border-2 border-blue-500 aspect-video"
          />
        </div>

        <div className="video-wrapper bg-white rounded-xl p-4 shadow-lg">
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            {selectedDoctor
              ? `${selectedDoctor.username}'s Video`
              : "Remote Video"}
          </h4>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg border-2 border-blue-500 aspect-video"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="controls flex justify-center gap-4">
        <button
          className={`p-3 rounded-full text-white text-xl shadow-md transition-all ${
            isMuted ? "bg-red-500" : "bg-blue-500"
          }`}
          onClick={toggleMute}
          title={isMuted ? "Unmute" : "Mute"}
        >
          <i className={`fas fa-microphone${isMuted ? "-slash" : ""}`}></i>
        </button>

        <button
          className={`p-3 rounded-full text-white text-xl shadow-md transition-all ${
            isVideoOff ? "bg-red-500" : "bg-blue-500"
          }`}
          onClick={toggleVideo}
          title={isVideoOff ? "Turn Video On" : "Turn Video Off"}
        >
          <i className={`fas fa-video${isVideoOff ? "-slash" : ""}`}></i>
        </button>

        <button
          className={`p-3 rounded-full text-white text-xl shadow-md transition-all ${
            isSharingScreen ? "bg-green-500" : "bg-blue-500"
          }`}
          onClick={shareScreen}
          title={isSharingScreen ? "Stop Sharing" : "Share Screen"}
        >
          <i className="fas fa-desktop"></i>
        </button>

        <button
          className="p-3 rounded-full bg-red-500 text-white text-xl shadow-md transition-all"
          onClick={endCall}
          title="End Call"
          disabled={!selectedDoctor}
        >
          <i className="fas fa-phone-slash"></i>
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
