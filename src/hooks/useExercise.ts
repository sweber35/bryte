import { useState } from "react";
import { Midi } from "tonal";

export const useExercise = (exercise: "NOTE" | "INTERVAL") => {
  const [score, updateScore] = useState<{ correct: number; wrong: number }>({
    correct: 0,
    wrong: 0,
  });

  const [question, setQuestion] = useState<number[]>([
    randomIntFromInterval(48, 72),
  ]);

  function next() {
    switch (exercise) {
      case "NOTE": {
        setQuestion([randomIntFromInterval(48, 72)]);
        break;
      }
      case "INTERVAL": {
        setQuestion([
          randomIntFromInterval(48, 72),
          randomIntFromInterval(48, 72),
        ]);
        break;
      }
    }
  }

  function validate(answer: number | number[]): boolean | null {
    if (Array.isArray(answer) && question.length > answer.length) {
      return null;
    }
    if (question.length > 1) {
      return false;
    } else {
      const correctResult =
        Midi.midiToNoteName(question[0], { pitchClass: true }) ===
        // @ts-ignore
        Midi.midiToNoteName(answer, { pitchClass: true });
      if (correctResult) {
        incrementCorrect();
        next();
        return true;
      } else {
        incrementWrong();
        return false;
      }
    }
  }

  function incrementCorrect() {
    updateScore((score) => {
      return { correct: score.correct + 1, wrong: score.wrong };
    });
  }

  function incrementWrong() {
    updateScore((score) => {
      return { correct: score.correct, wrong: score.wrong + 1 };
    });
  }

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return { validate, question, score };
};
