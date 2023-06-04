import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
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

export const { input } = filterSlice.actions;
export const filter = state => state.filter.value;
