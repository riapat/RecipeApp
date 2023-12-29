import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAdditionals = createAsyncThunk('additionals', async (recipeId) => {
    const apiKey = '23230aecb810420c97642ea995f9f07f';
    const res = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
    const data = await res.json();
    console.log('Additional Data', data);
    return { recipeId, data };
});