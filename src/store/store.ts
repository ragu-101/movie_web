// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/conterSlice';
import genreReducer from './slices/genreSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
