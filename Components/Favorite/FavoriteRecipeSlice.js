const { act } = require("react-test-renderer");
import { createSlice } from "@reduxjs/toolkit";


const favoriteRecipeSlice = createSlice({
    name: 'favoriteRecipes',
    initialState: [],
    reducers: {
        addFavoriteRecipe: (state, action) => {
            const existingRecipe = state.find((recipe) => recipe.id === action.payload.id);
            
            if (!existingRecipe) {
                state.push(action.payload);
            }
            console.log('Added Recipes: ', state);
        },
        removeFavoriteRecipe: (state, action) => {
            const index = state.findIndex((recipe) => recipe?.id === action.payload?.id);
            if (index > -1) {
                state.splice(index, 1);
            }
            console.log('Removed Recipes: ', state);

        }
    }
});

export const { addFavoriteRecipe, removeFavoriteRecipe } = favoriteRecipeSlice.actions;
export default favoriteRecipeSlice.reducer;