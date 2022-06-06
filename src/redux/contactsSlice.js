import { createSlice } from '@reduxjs/toolkit';

export const myContactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    elements: [],
  },
  reducers: {
    addContact(state, { payload }) {
      state.elements.push(payload);
    },
    removeContact(state, { payload }) {
      state.elements = state.elements.filter(item => item.id !== payload);
    },
  },
});

export const { addContact, removeContact } = myContactsSlice.actions;
