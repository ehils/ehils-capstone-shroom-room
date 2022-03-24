
// will be a very simiar syntax to how the home screen is currently laid out
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { getRecipesExpanded } from "../ApiManager";
import { RecipeCard } from "./RecipeCard";

// this page will display the latest cards, based upon date posted
// define a function that exports jsx for home page
// import RecipeCard
// initialize recipes state
// iterate recipe state and return RecipeCard

export const Recipes = () => {
    const [recipes, setRecipes] = useState([])

    useEffect (()=>{
        getRecipesExpanded()
        .then((data) => {
            setRecipes(data)
        })
    },[])
    return (
        <>
        {/* search recipes module-use for each page */}
            <Container fluid="sm">
            {
                recipes.map(recipe => {
                    return <RecipeCard recipe={recipe} />
                })
            }
            </Container>
        </>

    )
}