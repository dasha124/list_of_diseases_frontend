import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    disease: undefined,
};

const selectedDiseaseSlice = createSlice({
    name: 'selectedDisease',
    initialState: initialState,
    reducers: {
        updateDisease(state, action) {
            state.disease = action.payload
        }
    }
})

export const {updateDisease} = selectedDiseaseSlice.actions;

export default selectedDiseaseSlice.reducer;