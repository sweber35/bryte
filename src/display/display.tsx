import styled from "styled-components";
import { Midi } from "tonal";

type DisplayProps = {
  question: number[];
  score: {
    correct: number;
    wrong: number;
  };
};

const DisplayContainer = styled.div`
  width: 90vw;
  height: 36vh;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Display({ question, score }: DisplayProps) {
  return (
    <DisplayContainer>
      {/* ValidationFailed: {validationFailed.toString()} */}
      <br />
      <h1>Note: {Midi.midiToNoteName(question[0])}</h1>
      <br />
      <h1>Correct: {score.correct}</h1>
      <br />
      <h1>Incorrect: {score.wrong}</h1>
    </DisplayContainer>
  );
}
