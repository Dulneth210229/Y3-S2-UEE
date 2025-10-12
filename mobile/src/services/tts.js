import * as Speech from 'expo-speech';
export const speak = (text) => Speech.speak(text || '');
export const stop = () => Speech.stop();
