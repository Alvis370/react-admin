import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    index: '首页',
}

export const indexSlice = createSlice({
    name: 'index-slice',
    initialState,
    reducers: {
        changeHeadTitle: (state, { payload }) => {
            state.index = payload;
        },
    },
});

export const { changeHeadTitle } = indexSlice.actions;

export default indexSlice.reducer;