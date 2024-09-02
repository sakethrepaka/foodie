import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);

            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                console.warn(`Cannot remove product ${action.payload.id} as it's not there`);
            }
        },
        clearBasket: (state) => {
            state.items = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, clearBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithID = (state, id) =>
    state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) =>
    state.basket.items.reduce((total, item) => total += item.price, 0);

export default basketSlice.reducer;
