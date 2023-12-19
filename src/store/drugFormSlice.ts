import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status: false,
};

const modalSlice = createSlice({
    name: 'drugForm',
    initialState: initialState,
    reducers: {
        setOpen(state, action) {
            state.status = action.payload
        }
    }
})

export const {setOpen} = modalSlice.actions;

export default modalSlice.reducer;