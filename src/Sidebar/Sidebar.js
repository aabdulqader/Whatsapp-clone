import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import DonutLargeRoundedIcon from "@material-ui/icons/DonutLargeRounded";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import "./Sidebar.css";
import { IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat/SidebarChat";
import db from "../firebase";
const Sidebar = ({ user }) => {
  const [rooms, setRooms] = useState([]);

  // Retrive rooms data from database
  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerleft">
          <Avatar alt="Username" src={user.photoURL} />
        </div>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeRoundedIcon />
          </IconButton>
          <IconButton>
            <ChatRoundedIcon />
          </IconButton>
          <IconButton>
            <MoreVertRoundedIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="search__container">
          <SearchOutlinedIcon className="search__icon" />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => {
          return (
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
