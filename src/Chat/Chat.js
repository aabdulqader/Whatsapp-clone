import { Avatar, IconButton } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { SearchOutlined } from "@material-ui/icons";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import { useParams } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";
import { StateContext, useStateValue } from "../StateProvider";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  // message handler
  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }

    return () => {};
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="chatuser">
            <h3>{roomName}</h3>
            <small>
              last seen{" "}
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
            </small>
          </div>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((msg) => {
          const { name, message, timestamp } = msg;
          return (
            <p
              className={`chat__message ${
                name === user.displayName && "chat__receiver"
              }`}
            >
              {message}
              <span className="chat__name">{name}</span>
              <span className="chat__timestamp">
                {new Date(timestamp?.toDate()).toUTCString() || ""}
              </span>
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <IconButton>
          <EmojiEmotionsOutlinedIcon />
        </IconButton>
        <IconButton>
          <AttachFileOutlinedIcon />
        </IconButton>

        <form>
          <input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} disabled={!input}>
            <SendIcon className="sendIcon" />
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
