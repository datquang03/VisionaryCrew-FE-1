// src/pages/MessagePage.jsx
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { FaPaperPlane } from "react-icons/fa";
import MessageData from "../../data/MessageData";
import MessageItem from "./components/MessageItems";
import Sidebar from "./components/Sidebar";
import defaultImage from "../../assets/defaultAvatar.png";

const MessagePage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState(MessageData());
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const chatContainerRef = useRef(null);

  // Hardcode userId for testing
  const userId = "682ac559d587fe5f04959af3"; // Matches one of the sender/receiver IDs in MessageData

  // Initialize socket
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
      auth: { token: localStorage.getItem("accessToken") },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Handle real-time messages, deletes, and edits (for future use with API)
  useEffect(() => {
    if (!socket || !selectedUser) return;

    const handleReceiveMessage = (messageData) => {
      console.log("Received message:", messageData);
      if (
        (messageData.senderId === selectedUser._id &&
          messageData.receiverId === userId) ||
        (messageData.senderId === userId &&
          messageData.receiverId === selectedUser._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      }
    };

    const handleMessageDeleted = ({ messageId }) => {
      console.log("Message deleted:", messageId);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    };

    const handleMessageEdited = ({ messageId, content, updatedAt }) => {
      console.log("Message edited:", { messageId, content, updatedAt });
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, content, updatedAt } : msg
        )
      );
    };

    socket.on("receive-message", handleReceiveMessage);
    socket.on("message-deleted", handleMessageDeleted);
    socket.on("message-edited", handleMessageEdited);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.off("message-deleted", handleMessageDeleted);
      socket.off("message-edited", handleMessageEdited);
    };
  }, [socket, selectedUser, userId]);

  // Auto-scroll chat to the bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Send a message (placeholder for now)
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const newMsg = {
      _id: `temp_${Date.now()}`,
      sender: userId,
      receiver: selectedUser._id,
      content: newMessage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage("");
  };

  // Delete a message (placeholder for now)
  const deleteMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg._id !== messageId)
    );
  };

  // Edit a message (placeholder for now)
  const editMessage = (messageId, content) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === messageId
          ? { ...msg, content, updatedAt: new Date().toISOString() }
          : msg
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Filter messages based on selectedUser
  const filteredMessages = selectedUser
    ? messages.filter(
        (msg) =>
          (msg.sender === userId && msg.receiver === selectedUser._id) ||
          (msg.sender === selectedUser._id && msg.receiver === userId)
      )
    : [];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Sidebar */}
      <Sidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700 flex items-center gap-3">
              <img
                src={selectedUser.avatar || defaultImage}
                alt={selectedUser.username}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
              <h3 className="text-lg font-semibold text-white">
                {selectedUser.username}
              </h3>
            </div>

            {/* Chat messages */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-4 overflow-y-auto bg-gray-800"
            >
              {filteredMessages.length === 0 ? (
                <p className="text-gray-400 text-center">No messages yet</p>
              ) : (
                filteredMessages.map((message) => (
                  <MessageItem
                    key={message._id}
                    message={message}
                    userId={userId}
                    onDelete={deleteMessage}
                    onEdit={editMessage}
                  />
                ))
              )}
            </div>

            {/* Chat input */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-t border-gray-700 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
              />
              <button className="p-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300">
                <FaPaperPlane />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
