import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  time:'45-60 min'
};

const TimeSlice = createSlice({
  name: 'Time',
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { setTime } = TimeSlice.actions;

export default TimeSlice.reducer;