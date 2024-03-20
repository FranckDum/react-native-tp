import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: { email: '', favorites: [] },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addEmail: (state, action) => {
            state.value.email = action.payload;
        },
        addFavorite: (state, action) => {
            state.value.favorites.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.value.favorites = state.value.favorites.filter(
            (el) => el.name !== action.payload
            );
        },
    },
});

export const { addEmail, addFavorite, removeFavorite } = userSlice.actions;
export default userSlice.reducer;