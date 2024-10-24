import React from "react";

function ChatHeader({ username }) {
  return (
    <div style={{ paddingLeft: "500px", paddingTop: "150px" }}>
      <h2>
        Live Chat &nbsp;<span>{username}</span>
      </h2>
    </div>
  );
}

export default ChatHeader;
