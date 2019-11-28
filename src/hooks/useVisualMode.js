import { useState } from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      history.pop();
      setHistory(history);
    }
    setHistory(prev => [...prev, mode]);
    setMode(mode);
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(mode => history[history.length - 1]);
    }
  };

  return {
    mode,
    transition,
    back
  };
};

export default useVisualMode;
