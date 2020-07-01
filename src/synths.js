// try using a library besides nexus for UI...

import * as Tone from 'tone';

let vol, synth;

const toneSetup = async () => {
  await Tone.start();
  vol = new Tone.Volume(-12).toDestination();
  synth = new Tone.Synth().connect(vol);
};

const startInstruments = () => {
  synth.triggerAttack(440);
};

const stopInstruments = () => {
  synth.triggerRelease();
};

const updateInstruments = relPos => {
  updateSynth(relPos);
};

const updateSynth = relPos => {
  synth.setNote(parseInt(relPos.x * 1000, 10), '+8n');
};

export { toneSetup, updateInstruments, startInstruments, stopInstruments };
