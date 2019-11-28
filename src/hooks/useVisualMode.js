import { useState } from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      let newHistory = history.pop();
      setHistory([newHistory])
    }
    setHistory([...history, mode]);
    setMode(mode);
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(mode => history[history.length-1]);
    } 
  };

  return {
    mode,
    transition,
    back
  };
};

export default useVisualMode;
