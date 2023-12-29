import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchInstructions = createAsyncThunk('instructions', async (recipeId) => {
    const apiKey = '23230aecb810420c97642ea995f9f07f';
    const res = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`);
    const data = await res.json();
    console.log('Instructions Data', data);
    return { recipeId, data };
});