import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {fetchTags} from '../../FetchTags';

const Homeslice = createSlice({
    name: 'tags',
    initialState: {
        data: null,
        isLoading: false,
        isError: false,
    },
    
    extraReducers: builder => {
        builder.addCase(fetchTags.pending, (state, action) => {
            state.isLoading = true;

        });
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchTags.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export default Homeslice.reducer; 