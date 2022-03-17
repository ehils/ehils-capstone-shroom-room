import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { getRecipesExpanded } from "./ApiManager";
import { RecipeCard } from "./recipes/RecipeCard";

// this page will display the latest cards, based upon date posted
// define a function that exports jsx for home page
// import RecipeCard
// initialize recipes state
// iterate recipe state and return RecipeCard

export const Home = () => {
    const [recipes, setRecipes] = useState([])

    useEffect (()=>{
        getRecipesExpanded()
        .then((data) => {
            setRecipes(data)
        })
    },[])

    return (
        <>
            <h2>Hello</h2>
            {
                recipes.map(recipe => {
                    return <RecipeCard recipe={recipe} />
                })
            }
        </>

    )
}