import { useState } from "react";

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace) {
      history.pop();
    }
    setHistory([...history, mode]);
    setMode(mode);
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setHistory(history);
      setMode(mode => history.pop());
    } else {
      setMode(mode => history[0]);
    }
  };

  return {
    mode,
    transition,
    back
  };
};

export default useVisualMode;
