import { configureStore } from "@reduxjs/toolkit";
import TagReducer from "./Components/Home_Screen/HomeSlice";
import FavoriteRecipeReducer from "./Components/Favorite/FavoriteRecipeSlice";
import IngredientReducer from "./Components/Information/IngredientSlice";
import InstructionReducer from "./Components/Information/InstructionSlice";
import AdditionalReducer from "./Components/Information/AdditionalSlice";

export const store = configureStore({
    reducer: {
        tags: TagReducer,
        favoriteRecipes: FavoriteRecipeReducer,
        ingredients: IngredientReducer,
        instructions: InstructionReducer,
        additionals: AdditionalReducer,


    }, 
})

export default store;