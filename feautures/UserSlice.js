// premiumSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        details:{
            email:"",
            phoneNumber:"",
            username:""
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.details = { ...action.payload };
        },
    },
});

export const { setUser } = UserSlice.actions;

export const selectUser = (state) => state.user.details;

export default UserSlice.reducer;
