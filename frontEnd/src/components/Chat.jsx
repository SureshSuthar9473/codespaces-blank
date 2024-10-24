import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (message === "") return alert("Can Not Send Empty Message");
    const messageDAta = {
      username,
      room,
      message,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("send_message", messageDAta);
    setMessageList((prev) => [
      ...prev,
      { message, username, time: messageDAta.time },
    ]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("recive_msg", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);
  return (
    <div>
      <ChatHeader username={username} />
      <ChatBody messageList={messageList} userName={username} />
      <ChatFooter
        onChange={onChange}
        socket={socket}
        onSubmit={onSubmit}
        value={message}
      />
    </div>
  );
}

export default Chat;
