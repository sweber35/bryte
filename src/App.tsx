import { Keyboard } from "./keyboard/keyboard";
//@ts-ignore
import useWindowSizeWatcher from "./hooks/useWindowSizeWatcher";
import { useWebMidi } from "./hooks/useWebMidi";
import { useExercise } from "./hooks/useExercise";

import { useEffect, useState } from "react";
import "./App.css";
import { Display } from "./display/display";

function App() {
  const { width } = useWindowSizeWatcher();

  const [validationFailed, setValidationFailed] = useState(false);
  const { activeNotes } = useWebMidi();

  const { validate, question, score } = useExercise("NOTE");

  useEffect(() => {
    setValidationFailed(validate(activeNotes) || false);
  }, [activeNotes]);

  const noteRange = { first: 48, last: 72 };

  return (
    <>
      <Display question={question} score={score} />
      <Keyboard
        width={width}
        range={noteRange}
        activeKeys={[...activeNotes]}
        correctKeys={question}
      />
    </>
  );
}

export default App;
