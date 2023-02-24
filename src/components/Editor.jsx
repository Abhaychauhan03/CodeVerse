import React from "react";
import { useLocation } from "react-router-dom";

function Editor() {
  const location = useLocation();
  const [id] = location.state;
  return <div>{id}</div>;
}

export default Editor;
