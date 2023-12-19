import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    drug: undefined
};

const selectedDrugSlice = createSlice({
    name: 'selectedDrug',
    initialState: initialState,
    reducers: {
        updateDrug(state, action) {
            state.drug = action.payload
        }
    }
})

export const {updateDrug} = selectedDrugSlice.actions;

export default selectedDrugSlice.reducer;