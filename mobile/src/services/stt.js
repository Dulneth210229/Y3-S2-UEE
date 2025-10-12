import Voice from 'react-native-voice';

export const initVoice = (onResult, onError) => {
  try {
    Voice.onSpeechResults = (e) => onResult(e.value?.[0] || '');
    Voice.onSpeechError = onError;
  } catch {}
};
export const start = async () => { try { await Voice.start('en-US'); } catch {} };
export const stop = async () => { try { await Voice.stop(); } catch {} };
export const destroy = async () => { try { await Voice.destroy().then(Voice.removeAllListeners); } catch {} };
