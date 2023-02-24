import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Editor from "./components/Editor";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/codeeditor" element={<Editor />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
