import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTags = createAsyncThunk('tags', async (selectedDiet, selectedIntolerance) => {
    const apiKey = '23230aecb810420c97642ea995f9f07f';
    
    const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${selectedDiet}`);
    const final = await res.json();
    console.log('API Data: ', final);
    return final;
});
