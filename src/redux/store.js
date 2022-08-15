import { configureStore } from '@reduxjs/toolkit';
import indexSlice from './index-slice';
import userSlice from './user-slice';

const store = configureStore({
    reducer: {
        indexReducer: indexSlice,
        userReducer: userSlice
    }
})

export default store;