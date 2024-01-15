
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  startDate: string | null;
  endDate: string | null;
  status: string | null;
}

const initialState: FiltersState = {
  startDate: null,
  endDate: null,
  status: null,

};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string | null>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | null>) => {
        state.endDate = action.payload;
    },
    setStatus: (state, action: PayloadAction<string | null>) => {
        state.status = action.payload;
    },
    
  },
});

export const { setStartDate, setEndDate, setStatus} = filtersSlice.actions;
export default filtersSlice.reducer;
