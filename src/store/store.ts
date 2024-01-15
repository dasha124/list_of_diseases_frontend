import {configureStore} from "@reduxjs/toolkit";

import diseaseReducer from "./selectedDiseaseSlice"
import draftDrugReducer from "./draftDrugSlice"
import selectedDrugReducer from "./selectedDrugSlice"
import authReducer from "./authSlice"
import drugFormReducer from "./drugFormSlice"
import drugsReducer from "./drugsSlice"
import diseaseFilters from "./diseaseFiltersSlice"
import filtersReducer from './filtersSlice';


export default configureStore({
    reducer: {
        selectedDisease: diseaseReducer,
        diseaseFilters: diseaseFilters,
        draftDrug: draftDrugReducer,
        selectedDrug: selectedDrugReducer,
        drugs: drugsReducer,
        user: authReducer,
        drugForm: drugFormReducer,
        filters: filtersReducer,
    }
});


