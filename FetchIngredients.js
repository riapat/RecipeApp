import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchIngredients = createAsyncThunk('ingredients', async (recipeId) => {
    const apiKey = '23230aecb810420c97642ea995f9f07f';
    const res = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json?apiKey=${apiKey}`);
    const data = await res.json();
    console.log('Ingredients Data', data);
    return { recipeId, data };
});