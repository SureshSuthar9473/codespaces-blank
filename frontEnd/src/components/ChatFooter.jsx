import React, { useEffect, useState } from "react";
import styles from "../styles/chat.module.css";

const ChatFooter = ({ socket, onChange, onSubmit, value }) => {
  const [typingUsers, setTypingUsers] = useState(false);
  const [usernames, setusernames] = useState("");

  const handleTyping = (event) => {
    socket.emit("typing", {
      room: localStorage.getItem("room"),
      username: localStorage.getItem("username"),
      typing: event.target.value !== "",
    });
  };

  useEffect(() => {
    socket.on("typingResponse", (data) => {
      const { username, typing } = data;

      console.log("typing", typing);
      if (typing) {
        setusernames(username);

        setTypingUsers(true);
        setTimeout(() => {
          setTypingUsers(false);
        }, 5000);
      } else {
        setTypingUsers("");
        setTypingUsers(false);
      }
    });

    return () => {
      socket.off("typingResponse", handleTyping);
    };
  }, [socket]);

  return (
    <div className={`${styles.displayCenter} ${styles.chatFooter}`}>
      <input
        type="text"
        name="chatInput"
        placeholder="Type a message..."
        value={value}
        onChange={onChange}
        onKeyDown={handleTyping}
      />
      <button className="btn btn-primary" type="submit" onClick={onSubmit}>
        Send
      </button>
      {typingUsers ? (
        <p className={styles.typingIndicator}>
          {/* {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"}{" "} */}
          {usernames} is typing...
        </p>
      ) : null}
    </div>
  );
};

export default ChatFooter;
