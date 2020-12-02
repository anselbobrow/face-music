import * as Tone from 'tone';

let master_vol;

// an array holding various Tone.js synthesizers and oscillators
// indexed as follows
// [star trek glitchy sound effect, ]
let instruments = [];

const toneSetup = async () => {
  await Tone.start();
  master_vol = new Tone.Volume(-12).toDestination();
  instruments.push(new Tone.Synth().connect(master_vol));
  // instruments.push(
  //   new Tone.Synth({ oscillator: new Tone.OmniOscillator('fmsquare') }).connect(
  //     master_vol
  //   )
  // );
};

const startInstrument = id => {
  instruments[0].triggerAttack(Math.floor(Math.random() * 340 + 200));
};

const stopInstruments = () => {
  instruments.forEach(i => i.triggerRelease());
};

const updateInstruments = relPos => {
  updateSynth(relPos);
};

const updateSynth = relPos => {
  // 100–4000hz
  instruments[0].setNote(Math.floor(Math.pow(3901, relPos.x) + 99));
};

export { toneSetup, updateInstruments, startInstrument, stopInstruments };
