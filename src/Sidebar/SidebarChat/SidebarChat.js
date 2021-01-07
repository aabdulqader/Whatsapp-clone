import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db from "../../firebase";
import "./SidebarChat.css";
import firebase from "firebase";
import { Link } from "react-router-dom";

const SidebarChat = ({ addNewChat, name, id }) => {
  const [seed, setSeed] = useState("");
  const [lastMessage, setLastMessage] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  // Collect last message from specified room
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setLastMessage(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);

  // Create Room
  const createChat = () => {
    const roomName = prompt(">>> Please enter a room name for chat !!");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar__chat">
        <div className="chat__user">
          <Avatar
            className="roomImage"
            src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
          />
          <div className="text">
            <h3>{name}</h3>
            <p>{lastMessage[0]?.message}</p>
          </div>
        </div>
        <small>
          {new Date(lastMessage[0]?.timestamp?.toDate()).toUTCString()}
        </small>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebar__createchat">
      <h3>Add New Chat</h3>
    </div>
  );
};

export default SidebarChat;
