import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import { onValue, ref, set } from "firebase/database";
import { db } from "./firebase";
import "./Editor.css";

function Editor() {
  const [sessionId, setSessionId] = useState("");
  const [language, setLanguage] = useState("71");
  const [theme, setTheme] = useState("monokai");
  const [code, setCode] = useState("");
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

  const handleExecuteCode = async () => {
    console.log(code, language);
    const executeCode = async (code, language) => {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "0c13869146msh215b7b912ce6d7ap1ba769jsnb32199215ca6",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: language,
            stdin: input,
          }),
        }
      );

      const data = await response.json();
      const token = data.token;
      console.log(data);
      const getStatus = async () => {
        const statusResponse = await fetch(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key":
                "0c13869146msh215b7b912ce6d7ap1ba769jsnb32199215ca6",
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );
        const result = await statusResponse.json();
        if (result.status.id <= 2) {
          setTimeout(() => {
            getStatus();
          }, 1000);
        } else {
          setOutput(result.stdout || result.stderr);
        }
      };

      getStatus();
    };

    executeCode(code, language);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sessionId);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (sessionId) {
      set(ref(db, `sessions/${sessionId}/code`), newCode);
    }
  };

  return (
    <div className="editor__container">
      <div className="navbar__options">
        <div>
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            className="language__select"
          >
            <option value="54">C++</option>
            <option value="71">Python</option>
            <option value="72">Ruby</option>
            <option value="73">Perl</option>
            <option value="62">Java</option>
            <option value="50">C</option>
          </select>
        </div>
        <div className="theme__selection__container">
          <label htmlFor="theme-select">Theme:</label>
          <select
            id="theme-select"
            value={theme}
            className="theme__selection"
            onChange={handleThemeChange}
          >
            <option value="monokai">Monokai</option>
            <option value="github">GitHub</option>
            <option value="solarized_dark">Solarized Dark</option>
          </select>
        </div>
        <h2 className="nav__title">CodeVerse</h2>
        <button className="run__btn" onClick={handleExecuteCode}>
          Run
        </button>
        <h5 className="session__id" onClick={copyToClipboard}>
          Share:- {sessionId}
        </h5>
      </div>
      <div className="editor__body">
        <div className="editor__body__left">
          <AceEditor
            mode={language}
            theme={theme}
            onChange={handleCodeChange}
            value={code}
            height="88vh"
            width="100%"
          />
        </div>
        <div className="editor__body__right">
          <div>
            <h2>Input</h2>
            <textarea
              type="text"
              className="right__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
          <div>
            <h2>Output</h2>
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
