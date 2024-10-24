import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import styles from "../styles/chat.module.css";

const ChatBody = ({ messageList, userName }) => {
  return (
    <>
      <div className={`${styles.displayCenter} ${styles.chatBodyContainer}`}>
        <div className={`${styles.chatBody}`}>
          <ScrollToBottom className={styles.scrollToBottom}>
            {messageList?.map((list) => {
              return (
                <div
                  className={`${styles.chatContainer}`}
                  style={{
                    justifyContent: `${
                      list.username === userName ? "flex-end" : "flex-start"
                    }`,
                  }}
                >
                  <div
                    className={`${styles.chatWrapper}`}
                    style={{
                      backgroundColor: `${
                        list.username === userName ? "#FABEB1" : "#B1FAF9"
                      }`,
                    }}
                  >
                    <span
                      className={`${styles.chatContent}`}
                      style={{
                        justifyContent: `${
                          list.username === userName ? "flex-start" : "flex-end"
                        }`,
                      }}
                    >
                      {list.message}
                    </span>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
      </div>
    </>
  );
};

export default ChatBody;
