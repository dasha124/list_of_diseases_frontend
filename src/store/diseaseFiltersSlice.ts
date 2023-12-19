import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    diseases: [],
    query: ""
};

const modalSlice = createSlice({
    name: 'diseaseFilters',
    initialState: initialState,
    reducers: {
        updateDiseases(state, action) {
            state.diseases = action.payload
        },

        updateQuery(state, action) {
            state.query = action.payload
        }
    }
})

export const {updateDiseases, updateQuery} = modalSlice.actions;

export default modalSlice.reducer;