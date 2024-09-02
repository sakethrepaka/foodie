// locationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lat: 51.5,
  lng: -0.0877,
};

const LocationSlice = createSlice({
  name: 'Location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { setLocation } = LocationSlice.actions;

export default LocationSlice.reducer;
