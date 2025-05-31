import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import MessageItem from "./components/MessageItems";
import Sidebar from "./components/Sidebar";
import defaultImage from "../../assets/defaultAvatar.png";

const MessagePage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const chatContainerRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo ? userInfo.token : null;
  const userId =
    userInfo?.username === "nhatanh"
      ? "6832f0d1925ac4e968aa2413"
      : "682c19deaa8cdf0fe4bd9e0a";
  const userId2 =
    userInfo?.username === "nhatanh"
      ? "682c19deaa8cdf0fe4bd9e0a"
      : "6832f0d1925ac4e968aa2413";

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Initialize socket
  useEffect(() => {
    const newSocket = io(API_URL, {
      withCredentials: true,
      auth: { token },
    });
    setSocket(newSocket);

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [API_URL, token]);

  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (!userId2) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/messages/${userId}/${userId2}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);

        // Mark messages as read
        await axios.put(
          `${API_URL}/api/messages/read/${userId}/${userId2}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [ API_URL, userId, userId2, token]);

  // Handle real-time messages, deletes, and edits
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (messageData) => {
      console.log("Received message:", messageData); 
      if (
        (messageData.sender?._id === userId2 &&
          messageData.receiver?._id === userId) ||
        (messageData.sender?._id === userId &&
          messageData.receiver?._id === userId2)
      ) {
        setMessages((prevMessages) => {
          if (prevMessages.some((msg) => msg._id === messageData._id)) {
            return prevMessages;
          }
          return [...prevMessages, messageData];
        });
      }
    };

    const handleMessageDeleted = ({ messageId }) => {
      console.log("Message deleted:", messageId); // Debug log
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    };

    const handleMessageEdited = ({ messageId, content, updatedAt }) => {
      console.log("Message edited:", { messageId, content, updatedAt }); // Debug log
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
  }, [socket, selectedUser, userId, userId2]);

  // Auto-scroll chat to the bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Send a message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/messages/send`,
        {
          senderId: userId,
          receiverId: userId2,
          content: newMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Delete a message
  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(`${API_URL}/api/messages/${messageId}`, {
        data: { userId },
        headers: { Authorization: `Bearer ${token}` },
      });

      socket.emit("delete-message", {
        messageId,
        userId,
        receiverId: userId2,
      });
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Edit a message
  const editMessage = async (messageId, content) => {
    try {
      await axios.patch(
        `${API_URL}/api/messages/${messageId}`,
        { userId, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      socket.emit("edit-message", {
        messageId,
        userId,
        content,
        receiverId: userId2,
      });
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const filteredMessages = selectedUser
    ? messages.filter(
        (msg) =>
          (msg.sender?._id === userId && msg.receiver?._id === userId2) ||
          (msg.sender?._id === userId2 && msg.receiver?._id === userId)
      )
    : [];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Sidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
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
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-t border-gray-700 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300"
              >
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