import { createSlice } from "@reduxjs/toolkit";
import {fetchIngredients} from '../../FetchIngredients';

const IngredientSlice = createSlice({
    name: 'ingredients',
    initialState: {
        data: null,
        isLoading: false,
        isError: false,
    },
    reducers : {
        setFetchedIngredients: (state, action) => {
            return action.payload; // Update the state with fetched data
          },
    },
    extraReducers: builder => {
        builder.addCase(fetchIngredients.pending, (state, action) => {
            state.isLoading = true;

        });
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;

        });
        builder.addCase(fetchIngredients.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },

});

export const { setFetchedIngredients } = IngredientSlice.actions;
export default IngredientSlice.reducer; 