import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './feautures/basketSlice'
import restaurantReducer from './feautures/restaurantSlice'
import LocationReducer from './feautures/Locationslice'
import LocationNameReducer from './feautures/LocationNameslice'
import TimeReducer from './feautures/TimeSlice'
import premiumReducer from './feautures/premiumSlice'
import UserReducer from './feautures/UserSlice'
export const store = configureStore({
  reducer: {
    basket:basketReducer,
    restaurant:restaurantReducer,
    Location:LocationReducer,
    LocationName:LocationNameReducer,
    Time:TimeReducer,
    premium:premiumReducer,
    user:UserReducer
  },
})