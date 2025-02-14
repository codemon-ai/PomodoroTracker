let audioContext: AudioContext | null = null;

type SoundType = 'bell' | 'beep' | 'chime' | 'gong';

interface SoundConfig {
  frequency: number;
  duration: number;
  type: OscillatorType;
  gain: number;
}

const SOUND_CONFIGS: Record<SoundType, SoundConfig> = {
  bell: {
    frequency: 880,
    duration: 0.2,
    type: 'sine',
    gain: 0.5,
  },
  beep: {
    frequency: 1000,
    duration: 0.1,
    type: 'square',
    gain: 0.3,
  },
  chime: {
    frequency: 1200,
    duration: 0.3,
    type: 'triangle',
    gain: 0.4,
  },
  gong: {
    frequency: 440,
    duration: 0.5,
    type: 'sine',
    gain: 0.6,
  },
};

export const SOUND_NAMES: Record<SoundType, string> = {
  bell: '🔔 종소리',
  beep: '🎵 비프음',
  chime: '✨ 차임벨',
  gong: '🎶 공소리',
};

export function playNotification(soundType: SoundType = 'bell') {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  const config = SOUND_CONFIGS[soundType];
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = config.type;
  oscillator.frequency.setValueAtTime(config.frequency, audioContext.currentTime);
  gainNode.gain.setValueAtTime(config.gain, audioContext.currentTime);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + config.duration);

  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + config.duration
  );
}

export type { SoundType };