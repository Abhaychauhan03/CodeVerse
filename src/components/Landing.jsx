import { getDatabase, onValue, push, ref, set } from "firebase/database";
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
    onValue(
      ref(db, `sessions/${sessionid}`),
      (snapshot) => {
        const sessionData = snapshot.val();

        if (sessionData) {
          navigate("/codeeditor", {
            state: {
              id: sessionid,
            },
          });
        } else {
          alert("Invalid session ID. Please try again.");
        }
      },
      (error) => {
        console.error("Error checking session ID:", error);
      }
    );
  };
  return (
    <div className="landing">
      <div class="wave2">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
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
      <div class="wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Landing;
