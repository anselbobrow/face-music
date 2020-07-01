import * as Tone from 'tone';

let vol, synth;

const toneSetup = () => {
  vol = new Tone.Volume(-12).toDestination();
  synth = new Tone.Synth().connect(vol);
};

const updateInstruments = relPos => {
  updateSynth(relPos);
};

const stopInstruments = () => {
  synth.triggerRelease();
};

const updateSynth = relPos => {
  synth.setNote(parseInt(relPos.x * 1000, 10), '+8n');
};

export { toneSetup, updateInstruments, stopInstruments };
