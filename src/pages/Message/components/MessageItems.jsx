// src/pages/components/MessageItems.jsx
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const MessageItem = ({ message, userId, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);

  const startEditing = () => {
    setEditing(true);
    setEditedContent(message.content);
  };

  const saveEdit = () => {
    if (editedContent.trim()) {
      onEdit(message._id, editedContent);
      setEditing(false);
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditedContent(message.content);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }
  };

  const isSender = message.sender._id === userId;

  console.log(message)
  return (
    <div className={`mb-4 flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`inline-block p-3 rounded-lg max-w-xs ${
          isSender
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
            : "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 shadow"
        }`}
      >
        <p className="text-sm font-semibold">
          {isSender ? "You" : "Other User"}
        </p>
        {editing ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-1 border border-gray-600 rounded focus:outline-none bg-gray-700 text-white"
            />
            <button
              onClick={saveEdit}
              className="text-green-400 hover:text-green-300"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="text-red-400 hover:text-red-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <p>{message.content}</p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(
                message.updatedAt || message.createdAt
              ).toLocaleTimeString()}
            </p>
            {isSender && (
              <div className="flex gap-2 mt-1">
                <button
                  onClick={startEditing}
                  className="text-blue-300 hover:text-blue-200"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(message._id)}
                  className="text-red-300 hover:text-red-200"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
