import { createSlice } from "@reduxjs/toolkit";


interface genreType {
    id: number;
    name: string;
}

const initialState: genreType[] = [
];

const genreSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        movieGenre(state, action) {

        }
    }
})

export const { movieGenre } = genreSlice.actions
export default genreSlice.reducer;