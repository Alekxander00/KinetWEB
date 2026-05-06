import { useEffect, useRef, useState } from "react";
import styles from "./AudioToggle.module.css";

const TEMPO = 94;
const STEPS_PER_BAR = 16;
const LOOK_AHEAD_MS = 25;
const SCHEDULE_AHEAD_SECONDS = 0.18;
const DEFAULT_REACTIVE_STATE = {
  level: 0,
  bass: 0,
  mid: 0,
  treble: 0,
  pulse: 0
};

const PROGRESSION = [
  {
    bassPattern: [45, 45, 52, 45],
    chord: [57, 60, 64, 71],
    motif: [72, 76, 79, 76, 72, 76, 81, 79]
  },
  {
    bassPattern: [41, 41, 48, 41],
    chord: [53, 57, 60, 64],
    motif: [69, 72, 76, 72, 69, 72, 77, 76]
  },
  {
    bassPattern: [36, 36, 43, 36],
    chord: [55, 60, 62, 64],
    motif: [67, 71, 74, 71, 67, 71, 79, 74]
  },
  {
    bassPattern: [43, 43, 50, 43],
    chord: [55, 59, 62, 69],
    motif: [71, 74, 79, 74, 71, 74, 81, 79]
  }
];

const KICK_PATTERN = [1, 0, 0, 0, 0.22, 0, 0.32, 0, 1, 0, 0, 0, 0.18, 0, 0.3, 0];
const SNARE_PATTERN = [0, 0, 0, 0, 0.85, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0.1, 0];
const HAT_PATTERN = [0.2, 0.08, 0.15, 0.08, 0.18, 0.08, 0.15, 0.12, 0.22, 0.08, 0.15, 0.08, 0.18, 0.08, 0.16, 0.12];
const PLUCK_PATTERN = [0.85, 0, 0.5, 0, 0.3, 0, 0.65, 0, 0.85, 0, 0.5, 0, 0.35, 0, 0.72, 0];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function midiToFrequency(note) {
  return 440 * 2 ** ((note - 69) / 12);
}

function setReactiveState(nextState = DEFAULT_REACTIVE_STATE) {
  const state = {
    level: clamp(nextState.level ?? 0, 0, 1),
    bass: clamp(nextState.bass ?? 0, 0, 1),
    mid: clamp(nextState.mid ?? 0, 0, 1),
    treble: clamp(nextState.treble ?? 0, 0, 1),
    pulse: clamp(nextState.pulse ?? 0, 0, 1)
  };

  window.__KINET_AUDIO_REACTIVE__ = state;
  window.__KINET_AUDIO_LEVEL__ = state.level;
  document.documentElement.style.setProperty("--audio-level", state.level.toFixed(3));
}

function averageRange(values, start, end) {
  const safeEnd = Math.max(start + 1, end);
  let total = 0;

  for (let index = start; index < safeEnd; index += 1) {
    total += values[index];
  }

  return total / (safeEnd - start) / 255;
}

function createNoiseBuffer(context) {
  const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
  const channel = buffer.getChannelData(0);

  for (let index = 0; index < channel.length; index += 1) {
    channel[index] = Math.random() * 2 - 1;
  }

  return buffer;
}

function scheduleKick(context, time, bus, accent) {
  const oscillator = context.createOscillator();
  const click = context.createOscillator();
  const gain = context.createGain();
  const clickGain = context.createGain();
  const filter = context.createBiquadFilter();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(124, time);
  oscillator.frequency.exponentialRampToValueAtTime(46, time + 0.18);

  click.type = "triangle";
  click.frequency.setValueAtTime(220, time);
  click.frequency.exponentialRampToValueAtTime(120, time + 0.04);

  filter.type = "lowpass";
  filter.frequency.value = 720;
  filter.Q.value = 0.8;

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.16 * accent, time + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);

  clickGain.gain.setValueAtTime(0.0001, time);
  clickGain.gain.exponentialRampToValueAtTime(0.05 * accent, time + 0.005);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(bus);

  click.connect(clickGain);
  clickGain.connect(bus);

  oscillator.start(time);
  click.start(time);
  oscillator.stop(time + 0.32);
  click.stop(time + 0.08);
}

function scheduleSnare(context, time, bus, noiseBuffer, accent) {
  const noise = context.createBufferSource();
  const noiseFilter = context.createBiquadFilter();
  const noiseGain = context.createGain();
  const tone = context.createOscillator();
  const toneGain = context.createGain();

  noise.buffer = noiseBuffer;
  noiseFilter.type = "highpass";
  noiseFilter.frequency.value = 1600;
  noiseFilter.Q.value = 0.7;

  noiseGain.gain.setValueAtTime(0.0001, time);
  noiseGain.gain.exponentialRampToValueAtTime(0.11 * accent, time + 0.008);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

  tone.type = "triangle";
  tone.frequency.setValueAtTime(190, time);
  tone.frequency.exponentialRampToValueAtTime(130, time + 0.1);

  toneGain.gain.setValueAtTime(0.0001, time);
  toneGain.gain.exponentialRampToValueAtTime(0.035 * accent, time + 0.01);
  toneGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.14);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(bus);

  tone.connect(toneGain);
  toneGain.connect(bus);

  noise.start(time);
  tone.start(time);
  noise.stop(time + 0.22);
  tone.stop(time + 0.18);
}

function scheduleHat(context, time, bus, noiseBuffer, accent) {
  const noise = context.createBufferSource();
  const bandpass = context.createBiquadFilter();
  const highpass = context.createBiquadFilter();
  const gain = context.createGain();

  noise.buffer = noiseBuffer;

  bandpass.type = "bandpass";
  bandpass.frequency.value = 8600;
  bandpass.Q.value = 0.9;

  highpass.type = "highpass";
  highpass.frequency.value = 6200;

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.05 * accent, time + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.06);

  noise.connect(bandpass);
  bandpass.connect(highpass);
  highpass.connect(gain);
  gain.connect(bus);

  noise.start(time);
  noise.stop(time + 0.08);
}

function scheduleBass(context, time, bus, note, accent) {
  const carrier = context.createOscillator();
  const sub = context.createOscillator();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  carrier.type = "sawtooth";
  sub.type = "triangle";

  carrier.frequency.setValueAtTime(midiToFrequency(note), time);
  sub.frequency.setValueAtTime(midiToFrequency(note - 12), time);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(460, time);
  filter.frequency.exponentialRampToValueAtTime(170, time + 0.45);
  filter.Q.value = 0.8;

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.075 * accent, time + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.52);

  carrier.connect(filter);
  sub.connect(filter);
  filter.connect(gain);
  gain.connect(bus);

  carrier.start(time);
  sub.start(time);
  carrier.stop(time + 0.58);
  sub.stop(time + 0.58);
}

function schedulePad(context, time, bus, send, notes) {
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1900, time);
  filter.frequency.exponentialRampToValueAtTime(1300, time + 1.8);
  filter.Q.value = 0.65;

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.linearRampToValueAtTime(0.04, time + 0.6);
  gain.gain.linearRampToValueAtTime(0.03, time + 1.9);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.9);

  filter.connect(gain);
  gain.connect(bus);
  gain.connect(send);

  notes.forEach((note, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = index % 2 === 0 ? "triangle" : "sine";
    oscillator.frequency.setValueAtTime(midiToFrequency(note), time);
    oscillator.detune.value = index % 2 === 0 ? -4 : 4;
    oscillator.connect(filter);
    oscillator.start(time);
    oscillator.stop(time + 3.05);
  });
}

function schedulePluck(context, time, bus, send, note, accent) {
  const oscillator = context.createOscillator();
  const harmonic = context.createOscillator();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  const sendGain = context.createGain();

  oscillator.type = "triangle";
  harmonic.type = "sine";

  oscillator.frequency.setValueAtTime(midiToFrequency(note), time);
  harmonic.frequency.setValueAtTime(midiToFrequency(note + 12), time);

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(2200, time);
  filter.frequency.exponentialRampToValueAtTime(940, time + 0.42);
  filter.Q.value = 1.1;

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.03 * accent, time + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.42);

  sendGain.gain.value = 0.16 * accent;

  oscillator.connect(filter);
  harmonic.connect(filter);
  filter.connect(gain);
  gain.connect(bus);
  gain.connect(sendGain);
  sendGain.connect(send);

  oscillator.start(time);
  harmonic.start(time);
  oscillator.stop(time + 0.48);
  harmonic.stop(time + 0.48);
}

function scheduleStep(audio, time) {
  const section = PROGRESSION[audio.barIndex % PROGRESSION.length];
  const beatIndex = Math.floor(audio.currentStep / 4);
  const kickAccent = KICK_PATTERN[audio.currentStep];
  const snareAccent = SNARE_PATTERN[audio.currentStep];
  const hatAccent = HAT_PATTERN[audio.currentStep];
  const pluckAccent = PLUCK_PATTERN[audio.currentStep];

  if (audio.currentStep === 0) {
    schedulePad(audio.context, time, audio.padBus, audio.delayInput, section.chord);
  }

  if (kickAccent > 0) {
    scheduleKick(audio.context, time, audio.drumBus, kickAccent);
  }

  if (snareAccent > 0) {
    scheduleSnare(audio.context, time, audio.drumBus, audio.noiseBuffer, snareAccent);
  }

  if (hatAccent > 0) {
    scheduleHat(audio.context, time, audio.drumBus, audio.noiseBuffer, hatAccent);
  }

  if (audio.currentStep % 4 === 0) {
    scheduleBass(audio.context, time, audio.bassBus, section.bassPattern[beatIndex], beatIndex === 0 ? 1 : 0.74);
  }

  if (pluckAccent > 0) {
    const note = section.motif[audio.currentStep % section.motif.length];
    schedulePluck(audio.context, time, audio.leadBus, audio.delayInput, note, pluckAccent);
  }

  audio.currentStep = (audio.currentStep + 1) % STEPS_PER_BAR;

  if (audio.currentStep === 0) {
    audio.barIndex = (audio.barIndex + 1) % PROGRESSION.length;
  }
}

function runScheduler(audio) {
  const secondsPerBeat = 60 / TEMPO;
  const stepDuration = secondsPerBeat / 4;

  while (audio.nextStepTime < audio.context.currentTime + SCHEDULE_AHEAD_SECONDS) {
    scheduleStep(audio, audio.nextStepTime);
    audio.nextStepTime += stepDuration;
  }
}

function AudioToggle() {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    setReactiveState();

    return () => {
      window.cancelAnimationFrame(rafRef.current);

      if (audioRef.current?.schedulerId) {
        window.clearInterval(audioRef.current.schedulerId);
      }

      if (audioRef.current?.context && audioRef.current.context.state !== "closed") {
        audioRef.current.context.close().catch(() => {});
      }

      setReactiveState();
    };
  }, []);

  const monitorLevel = () => {
    const audio = audioRef.current;

    if (!audio?.analyser || !audio?.frequencyData || !audio?.timeData) {
      setReactiveState();
      return;
    }

    audio.analyser.getByteFrequencyData(audio.frequencyData);
    audio.analyser.getByteTimeDomainData(audio.timeData);

    const bass = averageRange(audio.frequencyData, 0, 10);
    const mid = averageRange(audio.frequencyData, 10, 36);
    const treble = averageRange(audio.frequencyData, 36, audio.frequencyData.length);

    let rmsTotal = 0;
    for (let index = 0; index < audio.timeData.length; index += 1) {
      const normalized = (audio.timeData[index] - 128) / 128;
      rmsTotal += normalized * normalized;
    }

    const rms = Math.sqrt(rmsTotal / audio.timeData.length);
    const transient = Math.max(0, bass - audio.previousBass * 0.88);
    const pulse = clamp(transient * 2.8 + rms * 0.9, 0, 1);
    const level = clamp(bass * 0.48 + mid * 0.32 + treble * 0.2 + pulse * 0.18, 0, 1);

    audio.previousBass += (bass - audio.previousBass) * 0.4;

    setReactiveState({
      level,
      bass,
      mid,
      treble,
      pulse
    });

    rafRef.current = window.requestAnimationFrame(monitorLevel);
  };

  const initializeAudio = async () => {
    if (audioRef.current) {
      return audioRef.current;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      throw new Error("AudioContext no disponible");
    }

    const context = new AudioContextClass();
    const analyser = context.createAnalyser();
    const compressor = context.createDynamicsCompressor();
    const masterGain = context.createGain();
    const drumBus = context.createGain();
    const bassBus = context.createGain();
    const padBus = context.createGain();
    const leadBus = context.createGain();
    const delayInput = context.createGain();
    const delay = context.createDelay();
    const delayFeedback = context.createGain();
    const delayTone = context.createBiquadFilter();
    const noiseBuffer = createNoiseBuffer(context);

    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.72;

    compressor.threshold.value = -18;
    compressor.knee.value = 22;
    compressor.ratio.value = 3.4;
    compressor.attack.value = 0.01;
    compressor.release.value = 0.22;

    masterGain.gain.value = 0.2;
    drumBus.gain.value = 1;
    bassBus.gain.value = 0.92;
    padBus.gain.value = 0.88;
    leadBus.gain.value = 0.7;

    delay.delayTime.value = 60 / TEMPO / 2;
    delayFeedback.gain.value = 0.26;
    delayTone.type = "lowpass";
    delayTone.frequency.value = 2200;
    delayInput.gain.value = 1;

    drumBus.connect(compressor);
    bassBus.connect(compressor);
    padBus.connect(compressor);
    leadBus.connect(compressor);

    delayInput.connect(delay);
    delay.connect(delayTone);
    delayTone.connect(delayFeedback);
    delayFeedback.connect(delay);
    delayTone.connect(compressor);

    compressor.connect(masterGain);
    masterGain.connect(analyser);
    analyser.connect(context.destination);

    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    const timeData = new Uint8Array(analyser.fftSize);

    const audio = {
      analyser,
      barIndex: 0,
      bassBus,
      compressor,
      context,
      currentStep: 0,
      delayInput,
      drumBus,
      frequencyData,
      leadBus,
      masterGain,
      nextStepTime: context.currentTime + 0.05,
      noiseBuffer,
      padBus,
      previousBass: 0,
      schedulerId: 0,
      timeData
    };

    audio.schedulerId = window.setInterval(() => {
      if (context.state === "running") {
        runScheduler(audio);
      }
    }, LOOK_AHEAD_MS);

    audioRef.current = audio;
    return audio;
  };

  const handleToggle = async () => {
    try {
      setError("");
      const audio = await initializeAudio();

      if (audio.context.state === "running") {
        await audio.context.suspend();
        window.cancelAnimationFrame(rafRef.current);
        setReactiveState();
        setIsPlaying(false);
        return;
      }

      audio.currentStep = 0;
      audio.barIndex = 0;
      audio.nextStepTime = audio.context.currentTime + 0.05;
      audio.previousBass = 0;

      await audio.context.resume();
      window.cancelAnimationFrame(rafRef.current);
      monitorLevel();
      setIsReady(true);
      setIsPlaying(true);
    } catch (nextError) {
      setError(nextError.message);
    }
  };

  return (
    <button
      type="button"
      className={isPlaying ? styles.toggleActive : styles.toggle}
      onClick={handleToggle}
      data-cursor="sonido"
      aria-pressed={isPlaying}
    >
      <span>{isPlaying ? "Soundtrack activo" : "Activar soundtrack"}</span>
      <small>{error || (isReady ? "Musica reactiva para el fondo" : "Pieza original, no loop plano")}</small>
    </button>
  );
}

export default AudioToggle;
