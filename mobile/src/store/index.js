import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from './slices/auth';
import jobs from './slices/jobs';
import applications from './slices/applications';
import chat from './slices/chat';
import network from './slices/network';
import suggestions from './slices/suggestions';

const rootReducer = combineReducers({ auth, jobs, applications, chat, network, suggestions });
const persistConfig = { key: 'root', storage: AsyncStorage, whitelist: ['auth', 'jobs', 'chat'] };
const persisted = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persisted,
  middleware: (getDefault) => getDefault({ serializableCheck: false })
});

export const persistor = persistStore(store);
export default store;
