import { WebMidi } from "webmidi";
  
  // Enable WebMidi.js and trigger the onEnabled() function when ready
  WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));

  // Function triggered when WebMidi.js is ready
  function onEnabled() {

    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
      console.log("No device detected." );
    } else {
      WebMidi.inputs.forEach((device, index) => {
        console.log(`Device detected: ${device.name}`);
      });
    }

    const myController = WebMidi.inputs[0];
    
    myController.channels[1].addListener( "noteon", event => onKeyPress( event ) );
    myController.channels[1].addListener( "noteoff", event => onKeyRelease( event ) );


  }

const onKeyPress = ( event ) => {

  let note = event.note;

  console.log(`${note.name}${ note.accidental ? note.accidental : '' } pressed`);
}

const onKeyRelease = ( event ) => {
  let note = event.note;

  console.log(`${note.name}${ note.accidental ? note.accidental : '' } released`);
}