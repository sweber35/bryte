import { useEffect, useState } from "react";
import { Interval, Midi } from "tonal";

export const useExercise = (exercise: "NOTE" | "INTERVAL") => {
  const [score, updateScore] = useState<{ correct: number; wrong: number }>({
    correct: 0,
    wrong: 0,
  });

  const [question, setQuestion] = useState<number[]>([]);

  const [hint, setHint] = useState<any>([]);

  const [correctKeys, setCorrectKeys] = useState<number[]>([]);

  const [validationDebounce, setValidationDebounce] = useState(false);

  useEffect(() => {
    next();
  }, []);

  function next() {
    switch (exercise) {
      case "NOTE": {
        const newNote = randomIntFromInterval(48, 72);
        setQuestion([newNote]);
        setHint([newNote]);
        break;
      }
      case "INTERVAL": {
        const bottom = 48;
        const top = 72;
        const note1 = randomIntFromInterval(bottom, top);
        const note2 = randomIntFromInterval(
          // make sure root isn't top most note on keyboard
          note1 + 1 > top ? top - 1 : note1 + 1,

          // make sure interval doesn't exceed keyboard
          note1 + 12 > top ? top : note1 + 12
        );

        const intervalName = Interval.distance(
          Midi.midiToNoteName(note1),
          Midi.midiToNoteName(note2)
        );

        setQuestion([note1, note2]);
        setHint([note1, intervalName]);
        break;
      }
    }
  }

  function validate(answer: number | number[]): boolean | null {
    if (!Array.isArray(answer)) {
      // single answer = note identification
      const correctResult =
        Midi.midiToNoteName(question[0], { pitchClass: true }) ===
        // @ts-ignore
        Midi.midiToNoteName(answer, { pitchClass: true });
      if (correctResult) {
        incrementCorrect();
        return true;
      } else {
        incrementWrong();
        return false;
      }
    } else {
      if (Array.isArray(answer) && !answer.length) {
        // incomplete answer input
        return null;
      } else if (Array.isArray(answer) && answer.length < question.length) {
        // prevent validation on initial render before there's any input
        return null;
      } else if (question.length > 1) {
        // multi-answer = interval or chord indetification
        // TODO: chord identification logic
        // TODO: generating random numbers isn't a practical way to produce intervals when I'll want to filter by certain qualitities
        const correctResult =
          question.filter((value) => !answer.includes(value)).length === 0;

        if (correctResult) {
          incrementCorrect();
          return true;
        } else {
          incrementWrong();
          return false;
        }
      } else return false;
    }
  }

  function incrementCorrect() {
    if (validationDebounce) return;
    updateScore((score) => {
      return { correct: score.correct + 1, wrong: score.wrong };
    });
    next();
  }

  function incrementWrong() {
    if (validationDebounce) return;
    updateScore((score) => {
      return { correct: score.correct, wrong: score.wrong + 1 };
    });
    setCorrectKeys(question);
    setValidationDebounce(true);
    setTimeout(() => {
      setCorrectKeys([]);
      next();
      setValidationDebounce(false);
    }, 3000);
  }

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return { validate, hint, score, correctKeys };
};
