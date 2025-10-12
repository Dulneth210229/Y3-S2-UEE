import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'chat',
  initialState: { conversations: [], messages: {} },
  reducers: {
    addConversation(s, a) { s.conversations.unshift(a.payload); },
    addMessage(s, a) { const { conversationId, msg } = a.payload; (s.messages[conversationId] ||= []).push(msg); }
  }
});
export const { addConversation, addMessage } = slice.actions;
export default slice.reducer;
