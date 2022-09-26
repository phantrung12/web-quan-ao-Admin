import React from "react";
import { useEffect, useState } from "react";
import axiosIntance from "../../helpers/axios";
import "./Conversation.css";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axiosIntance.get(`/getUser/${friendId}`);
        // console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.user.profilePicture
            ? user?.user.profilePicture
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.user.username}</span>
    </div>
  );
};

export default Conversation;
