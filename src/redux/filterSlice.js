import { createSlice } from '@reduxjs/toolkit';

export const myFilterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: '',
  },
  reducers: {
    input(state, { payload }) {
      state.value = payload;
    },
  },
});

export const { input } = myFilterSlice.actions;
