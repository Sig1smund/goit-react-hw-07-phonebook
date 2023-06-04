import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { filterSlice } from './filterSlice';
import { contactsSlice } from './contactSlice';
import { contactApi } from './contactApi';
import storage from 'redux-persist/lib/storage';
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedContactsReducer = persistReducer(
	persistConfig,
	contactsSlice.reducer
);

const persistedFilterReducer = persistReducer(
	persistConfig,
	filterSlice.reducer
);

export const store = configureStore({
	reducer: {
		contacts: persistedContactsReducer,
		filter: persistedFilterReducer,
		[contactApi.reducerPath]: contactApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(contactApi.middleware),
});

export const persistor = persistStore(store);
