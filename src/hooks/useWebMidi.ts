import { useEffect, useState } from "react";
import { Midi } from "tonal";
import { WebMidi } from "webmidi";

export const useWebMidi = () => {
  const [activeNotes, setActiveNotes] = useState<number[]>([]);

  function addActiveNote(note: number) {
    setActiveNotes((activeNotes) => {
      if (activeNotes && activeNotes.includes(note)) return activeNotes;

      return activeNotes.concat(note);
    });
  }

  function removeActiveNote(note: number) {
    setActiveNotes((activeNotes) =>
      activeNotes.filter((activeNote: number) => activeNote !== note)
    );
  }

  useEffect(() => {
    WebMidi.enable()
      .then(onEnabled)
      .catch((err) => alert(err));

    function onEnabled() {
      // Inputs
      WebMidi.inputs.forEach((input) =>
        console.log(input.manufacturer, input.name)
      );

      // Outputs
      WebMidi.outputs.forEach((output) =>
        console.log(output.manufacturer, output.name)
      );

      // Key Listner
      const myInput = WebMidi.getInputByName("MPKmini2");

      if (myInput) {
        myInput.addListener("noteon", (e) => {
          //   console.log("on:", e.note.identifier);
          addActiveNote(Midi.toMidi(e.note.identifier) || 0);
        });

        myInput.addListener("noteoff", (e) => {
          //   console.log("off:", e.note.identifier);
          removeActiveNote(Midi.toMidi(e.note.identifier) || 0);
        });
      }
    }
  }, []);

  return { activeNotes };
};
