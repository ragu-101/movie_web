// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/conterSlice';
// import genreReducer from './slices/genreSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
