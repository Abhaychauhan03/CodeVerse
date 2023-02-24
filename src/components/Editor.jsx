import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase";
import "./Editor.css";

function Editor() {
  const [sessionId, setSessionId] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("monokai");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const location = useLocation();

  useEffect(() => {
    const { id } = location.state;
    if (id) setSessionId(id);
    const dbRef = ref(db, `sessions/${sessionId}/code`);
    onValue(dbRef, (snapshot) => {
      const newCode = snapshot.val();
      setCode(newCode);
    });
  }, [sessionId]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className="editor__container">
      <div className="navbar__options">
        <div>
          <label htmlFor="language-select">Language:</label>
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div>
          <label htmlFor="theme-select">Theme:</label>
          <select id="theme-select" value={theme} onChange={handleThemeChange}>
            <option value="monokai">Monokai</option>
            <option value="github">GitHub</option>
            <option value="solarized_dark">Solarized Dark</option>
          </select>
        </div>
        <button>Run</button>
        <h5>{sessionId}</h5>
      </div>
      <div className="editor__body">
        <div className="editor__body__left">
          <AceEditor
            mode={language}
            theme={theme}
            onChange={setCode}
            value={code}
            height="100vh"
            width="100%"
          />
        </div>
        <div className="editor__body__right">
          <div>
            <textarea
              type="text"
              className="right__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
          <div>
            <textarea
              type="text"
              className="right__output"
              value={output}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
