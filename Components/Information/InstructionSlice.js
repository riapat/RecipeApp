import { createSlice } from "@reduxjs/toolkit";
import {fetchInstructions} from '../../FetchInstructions';

const InstructionSlice = createSlice({
    name: 'instructions',
    initialState: {
        data: null,
        isLoading: false,
        isError: false,
    },
    reducers : {
        setFetchedInstructions: (state, action) => {
            state.data =  action.payload; // Update the state with fetched data
          },
    },
    extraReducers: builder => {
        builder.addCase(fetchInstructions.pending, (state, action) => {
            state.isLoading = true;

        });
        builder.addCase(fetchInstructions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;

        });
        builder.addCase(fetchInstructions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },

});

export const { setFetchedInstructions } = InstructionSlice.actions;
export default InstructionSlice.reducer; 