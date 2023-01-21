import styled from "styled-components";
import { Midi } from "tonal";

type DisplayProps = {
  hint: any[];
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export function Display({ hint, score }: DisplayProps) {
  return (
    <DisplayContainer>
      {/* ValidationFailed: {validationFailed.toString()} */}
      <br />
      <h1>Note: {Midi.midiToNoteName(hint[0])}</h1>
      <h1>Interval: {hint[1]}</h1>
      <br />
      <h1>Correct: {score.correct}</h1>
      <br />
      <h1>Incorrect: {score.wrong}</h1>
    </DisplayContainer>
  );
}
