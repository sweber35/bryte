import { useEffect, useState } from "react";

//@ts-ignore
import Granim from "granim";
import { Midi } from "tonal";

type GranimKeyProps = {
  midiKey: number;
  active: boolean;
  emphasize?: boolean;
  granimConfig: {
    direction: string;
    isPausedWhenNotInView: boolean;
    stateTransitionSpeed: number;
    states: {
      [key: string]: {
        gradients: string[][];
        transitionSpeed?: number;
      };
    };
  };
};

export function GranimKey(props: GranimKeyProps) {
  const [granimInstance, setGranimInstance]: any = useState(null);
  const note = Midi.midiToNoteName(props.midiKey);
  const quality = note.includes("b") ? "sharp" : "natural";

  useEffect(() => {
    const granimConfigClone = { ...props.granimConfig } as any;
    granimConfigClone.element = `.key-${props.midiKey}`;
    granimConfigClone.defaultStateName = `inactive-${quality}`;
    setGranimInstance(new Granim(granimConfigClone));
  }, []);

  useEffect(() => {
    if (granimInstance && props.emphasize) {
      granimInstance.changeState("emphasize");
      granimInstance.play();
    }
  });

  useEffect(() => {
    if (granimInstance) {
      if (props.active) {
        granimInstance.changeState("active");
        granimInstance.play();
      } else {
        granimInstance.changeState(`inactive-${quality}`);
        granimInstance.pause();
      }
    }
  }, [props.active]);

  return (
    <canvas
      key={props.midiKey}
      className={`key key-${quality} key-${props.midiKey}${
        props.active ? " key-active" : ""
      }`}
    />
  );
}
