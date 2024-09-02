// premiumSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const premiumSlice = createSlice({
    name: 'premium',
    initialState: {
        isPremium: false,
    },
    reducers: {
        setPremium: (state, action) => {
            state.isPremium = action.payload;
        },
    },
});

export const { setPremium } = premiumSlice.actions;

export const selectPremium = (state) => state.premium.isPremium;

export default premiumSlice.reducer;
