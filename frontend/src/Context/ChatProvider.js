import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();
export const ChatState = () => {
  return useContext(ChatContext);
};

const ChatProvider = ({ children }) => {
  //here
  const [User, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();

  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <ChatContext.Provider
        value={{
          User,
          setUser,
          selectedChat,
          setSelectedChat,
          chats,
          setChats,
          notification,
          setNotification,
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
};

export default ChatProvider;
