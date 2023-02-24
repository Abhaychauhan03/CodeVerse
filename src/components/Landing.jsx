import { getDatabase, push, ref, set } from "firebase/database";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();
  const [sessionid, setSessionId] = useState("");

  const handleCreateClick = () => {
    const newSessionRef = push(ref(db, "sessions"));
    const newSessionId = newSessionRef.key;
    set(ref(db, `sessions/${newSessionId}/code`), "// Enter your code here");

    navigate("/codeeditor", {
      state: {
        id: newSessionId,
      },
    });
  };

  const handleJoinClick = () => {
    navigate("/codeeditor", {
      state: {
        id: sessionid,
      },
    });
  };
  return (
    <div className="landing">
      <div className="landing__create">
        <button className="create__btn" onClick={handleCreateClick}>
          Create
        </button>
      </div>
      <div className="landing__join">
        <input
          value={sessionid}
          onChange={(e) => setSessionId(e.target.value)}
          type="text"
          placeholder="Enter session Id"
          className="join__input"
        />
        <button className="join__btn" onClick={handleJoinClick}>
          Join
        </button>
      </div>
    </div>
  );
}

export default Landing;
