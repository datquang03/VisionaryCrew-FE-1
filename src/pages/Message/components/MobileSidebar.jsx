import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { gsap } from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { getUserMessaged } from "../../../redux/APIs/slices/messageSlice";
import defaultImage from "../../../assets/defaultAvatar.png";
import ShortLoading from "../../../components/Loading/ShortLoading";


const MobileSidebar = ({ onSelectUser, selectedUser, onClose }) => {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?._id;
  const { userMessaged, isLoading, isSuccess } = useSelector(
    (state) => state.messageSlice
  );

  const userItemsRef = useRef([]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserMessaged(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    gsap.fromTo(
      userItemsRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [userMessaged]);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="p-4 flex justify-between items-center border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
        <h2 className="text-xl font-semibold">Chats</h2>
        <button
          className="text-white hover:text-red-400"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <ShortLoading text={"Đang tải tin nhắn..."} />
        ) : isSuccess && userMessaged?.length > 0 ? (
          userMessaged.map((item, index) => (
            <div
              key={item.user._id}
              className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-800 transition-all duration-300 ${
                selectedUser?._id === item.user._id
                  ? "bg-blue-900"
                  : ""
              }`}
              onClick={() => onSelectUser(item.user)}
              ref={(el) => (userItemsRef.current[index] = el)}
            >
              <img
                src={item.user.avatar || defaultImage}
                alt={item.user.username}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="flex-1">
                <p className="font-medium">{item.user.username}</p>
                {item.lastMessage && (
                  <p
                    className={`text-sm truncate ${
                      item.lastMessage.read ? "text-gray-400" : "text-white font-semibold"
                    }`}
                  >
                    {item.lastMessage.content}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-gray-400">Không có cuộc trò chuyện nào</div>
        )}
      </div>
    </div>
  );
};

export default MobileSidebar;