import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { AddRecipe } from "./create/AddRecipe";
import { Home } from "./Home";
import { RecipeDetail } from "./recipes/RecipeDetail";
import { EditRecipe } from "./users/EditRecipe";
import { MyRecipes } from "./users/MyRecipes";

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/recipes/:recipeId(\d+)">
                <RecipeDetail />
            </Route>
            {/* <Route exact path="/myrecipes/recipes/:recipeId(\d+)">
                <RecipeDetail />
            </Route> */}
            <Route exact path="/myrecipes/:userId(\d+)">
                <MyRecipes />
            </Route>
            <Route exact path="/create/addrecipe">
                <AddRecipe />
            </Route>
            <Route exact path="/editrecipe/:recipeId(\d+)">
                <EditRecipe />
            </Route>
        </>
    )
}