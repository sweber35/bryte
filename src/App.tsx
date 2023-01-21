import { useEffect, useState } from "react";
import "./App.css";

import { useWindowSizeWatcher } from "./hooks/useWindowSizeWatcher";
import { useWebMidi } from "./hooks/useWebMidi";
import { useExercise } from "./hooks/useExercise";

import { Display } from "./display/display";
import { Keyboard } from "./keyboard/keyboard";

function App() {
  const { width, height } = useWindowSizeWatcher();

  const [validationFailed, setValidationFailed] = useState(false);
  const { activeNotes } = useWebMidi();

  const { validate, hint, score, correctKeys } = useExercise("INTERVAL");

  useEffect(() => {
    setValidationFailed(validate(activeNotes) || false);
  }, [activeNotes]);

  const noteRange = { first: 48, last: 72 };

  return (
    <>
      <Display hint={hint} score={score} />
      <Keyboard
        width={width * 0.9}
        height={height * 0.5 * 0.9}
        range={noteRange}
        activeKeys={[...activeNotes]}
        correctKeys={[...correctKeys]}
      />
    </>
  );
}

export default App;
