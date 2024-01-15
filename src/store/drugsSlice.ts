import {createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState= {
    queryPageIndex: 0,
    queryPageSize: 5,
    totalCount: 0,
};

const drugsSlice = createSlice({
    name: 'diseases',
    initialState: initialState,
    reducers: {
        pageChanged(state, action) {
            state.queryPageIndex = action.payload
        },
        pageSizeChanged(state, action) {
            state.queryPageSize = action.payload
        },
        totalCountChanged(state, action) {
            state.totalCount = action.payload
        }
    }
})

export const {pageChanged, pageSizeChanged, totalCountChanged} = drugsSlice.actions;

export default drugsSlice.reducer;