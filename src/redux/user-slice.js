import { createSlice } from '@reduxjs/toolkit';
import storageUtils from '../utils/storageUtils';

const initialState = {
    user: storageUtils.getUser(),
}

export const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        getUser: (state, action) => {
            switch (action.type) {
                default:
                    return state;
            }
        },
    },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;