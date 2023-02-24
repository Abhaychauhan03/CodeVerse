import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import database from "./firebase";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();
  const [sessionid, setSessionId] = useState("");

  const handleCreateClick = () => {
    const newSessionRef = database.ref("sessions").push();
    const newSessionId = newSessionRef.key;
    newSessionRef
      .set({
        code: "// Enter your code here",
      })
      .then(() => {
        setSessionId(newSessionId);
        console.log("created");
        navigate("/codeeditor", {
          state: {
            id: newSessionId,
          },
        });
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
        <button className="join__btn">Join</button>
      </div>
    </div>
  );
}

export default Landing;
