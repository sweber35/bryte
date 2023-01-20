import styled from "styled-components";
import { Midi } from "tonal";
import { GranimKey } from "./key";

interface KeyboardContainerProps {
  $naturalKeyWidth: number;
  $naturalKeyHeight: number;
  $sharpKeyWidth: number;
  $sharpKeyHeight: number;
}

const KeyboardContainer = styled.div<KeyboardContainerProps>`
  position: relative;
  display: flex;
  justify-content: flex-start;

  .key-natural {
    position: relative;
    width: ${(props) => props.$naturalKeyWidth}px;
    height: ${(props) => props.$naturalKeyHeight}px;
    border: 1px solid black;
    box-sizing: border-box;
  }

  .key-sharp {
    position: relative;
    width: ${(props) => props.$sharpKeyWidth}px;
    height: ${(props) => props.$sharpKeyHeight}px;
    border: 2px solid black;
    box-sizing: border-box;
    z-index: 1;
    transform: translateX(-50%);
  }

  .key-sharp + .key-natural {
    margin-left: ${(props) => props.$sharpKeyWidth * -1}px;
    // calculating a negative margin equal to black key width
  }

  .key.correct {
    border: 1px solid black;
  }

  .key.active {
    border: 2px solid black;
  }
`;

type KeyboardProps = {
  range: {
    first: number;
    last: number;
  };
  activeKeys: number[];
  correctKeys: number[];
  width: number;
};

export function Keyboard({
  range,
  activeKeys,
  correctKeys,
  width,
}: KeyboardProps) {
  const midiRange: number[] = Array(range.last - range.first + 1)
    .fill(Number)
    .map((_, idx) => range.first + idx);

  const granimConfig = {
    direction: "diagonal",
    isPausedWhenNotInView: false,
    stateTransitionSpeed: 1,
    states: {
      "inactive-natural": {
        gradients: [["#fffff0", "#fffff0"]],
      },
      "inactive-sharp": {
        gradients: [["#36454f", "#36454f"]],
      },
      active: {
        gradients: [
          ["#AFFCAF", "#12DFF3"],
          ["#12DFF3", "#AFFCAF"],
        ],
        transitionSpeed: 1000,
      },
      emphasize: {
        gradients: [
          ["#f40752", "#f9ab8f"],
          ["#f9ab8f", "#f40752"],
        ],
        transitionSpeed: 1000,
      },
    },
  };

  const keys = midiRange.map((midiNumber) => {
    return (
      <GranimKey
        key={midiNumber}
        midiKey={midiNumber}
        active={activeKeys.includes(midiNumber)}
        emphasize={correctKeys.includes(midiNumber)}
        granimConfig={granimConfig}
      />
    );
  });

  const numberOfNaturalKeys = midiRange.filter(
    (midiNumber) => !Midi.midiToNoteName(midiNumber).includes("b")
  ).length;

  const naturalKeyWidth = (width / numberOfNaturalKeys) * 0.9;
  const naturalKeyHeight = naturalKeyWidth / (24 / 100);
  const sharpKeyWidth = naturalKeyWidth * (30 / 48);
  const sharpKeyHeight = naturalKeyHeight / 2;

  return (
    <KeyboardContainer
      $naturalKeyWidth={naturalKeyWidth}
      $naturalKeyHeight={naturalKeyHeight}
      $sharpKeyWidth={sharpKeyWidth}
      $sharpKeyHeight={sharpKeyHeight}
      id="piano-keyboard"
    >
      {keys}
    </KeyboardContainer>
  );
}
