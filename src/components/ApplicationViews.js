import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { AddRecipe } from "./create/AddRecipe";
import { Home } from "./Home";
import { RecipeDetail } from "./recipes/RecipeDetail";
import { Recipes } from "./recipes/Recipes";
import { ShroomDetail } from "./shrooms/ShroomDetail";
import { ShroomRecipes } from "./shrooms/ShroomRecipes";
import { Shrooms } from "./shrooms/Shrooms";
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
            <Route exact path="/recipes">
                <Recipes />
            </Route>
            <Route exact path="/shroomrecipes/:shroomId(\d+)">
                <ShroomRecipes />
            </Route>
            
            <Route exact path="/myrecipes/:userId(\d+)">
                <MyRecipes />
            </Route>
            <Route exact path="/create/addrecipe">
                <AddRecipe />
            </Route>
            <Route exact path="/editrecipe/:recipeId(\d+)">
                <EditRecipe />
            </Route>
            <Route exact path="/shrooms">
                <Shrooms />
            </Route>
            <Route exact path="/shrooms/:shroomId(\d+)">
                <ShroomDetail />
            </Route>
            {/* <Route exact path="/recipeshrooms/:shroomId(\d+)">
                <ShroomDetail />
            </Route> */}
        </>
    )
}