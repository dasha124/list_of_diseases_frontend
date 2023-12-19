import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    drug: undefined
};

const draftDrugSlice = createSlice({
    name: 'draftDrug',
    initialState: initialState,
    reducers: {
        updateDrug(state, action) {
            state.drug = action.payload
        }
    }
})

export const {updateDrug} = draftDrugSlice.actions;

export default draftDrugSlice.reducer;