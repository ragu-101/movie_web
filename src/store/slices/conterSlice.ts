// src/redux/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  movieId: string;
}

const initialState: MovieState = {
  movieId: '550',
};

const counterSlice = createSlice({
  name: 'moviesIds',
  initialState,
  reducers: {
    getMovieId: (state, action: PayloadAction<string>)  => { state.movieId = action.payload  },
  },
});

export const { getMovieId } = counterSlice.actions;
export default counterSlice.reducer;
