import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { syncQueue } from '../api/offlineQueue';
import { useDispatch } from 'react-redux';
import { setOnline } from '../store/slices/network';

export default function useNetInfoQueue() {
  const dispatch = useDispatch();
  useEffect(() => {
    const sub = NetInfo.addEventListener(state => {
      dispatch(setOnline(!!state.isConnected));
      if (state.isConnected) syncQueue();
    });
    return () => sub && sub();
  }, []);
}
