import { createSlice } from "@reduxjs/toolkit";
import {fetchAdditionals} from '../../FetchAdditionals';

const AdditionalSlice = createSlice({
    name: 'additionals',
    initialState: {
        data: null,
        isLoading: false,
        isError: false,
    },
    reducers : {
        setFetchedAdditionals: (state, action) => {
            state.data =  action.payload; // Update the state with fetched data
          },
    },
    extraReducers: builder => {
        builder.addCase(fetchAdditionals.pending, (state, action) => {
            state.isLoading = true;

        });
        builder.addCase(fetchAdditionals.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;

        });
        builder.addCase(fetchAdditionals.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },

});

export const { setFetchedAdditionals } = AdditionalSlice.actions;
export default AdditionalSlice.reducer; 