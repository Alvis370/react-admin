import { createSlice } from '@reduxjs/toolkit';
import storageUtils from '../utils/storageUtils';

const initialState = {
    user: storageUtils.getUser(),
}

export const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            storageUtils.saveUser(action.payload);
            // memoryUtils.user = action.payload; // 保存在内存中
            state.user = action.payload;
        },
        deleteUser: (state) => {
            storageUtils.removeUser();
            // memoryUtils.user = {};
            state.user = {};
        },
    },
});

export const { saveUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;