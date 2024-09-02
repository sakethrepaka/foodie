// locationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locname:'Your Loc'
};

const LocationNameSlice = createSlice({
  name: 'LocationName',
  initialState,
  reducers: {
    setLocationName: (state, action) => {
      state.locname = action.payload;
    },
  },
});

export const { setLocationName } = LocationNameSlice.actions;

export default LocationNameSlice.reducer;