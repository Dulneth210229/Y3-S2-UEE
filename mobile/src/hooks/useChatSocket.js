import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/slices/chat';
import { notifyLocal } from '../services/notifications';

export default function useChatSocket() {
  const { user } = useSelector(s => s.auth);
  const socketRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    const socket = io(Constants.expoConfig.extra.API_URL.replace(/^http/, 'ws'), { query: { userId: user._id } });
    socket.on('message', (msg) => {
      dispatch(addMessage({ conversationId: msg.conversation, msg }));
      notifyLocal('New message', msg.body);
    });
    socketRef.current = socket;
    return () => socket.disconnect();
  }, [user]);

  return { socket: socketRef.current };
}
