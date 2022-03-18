import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getRecipeDetail, getRecipeIngredients, getRecipeSteps } from "../ApiManager";

// define a function which takes a single recipe arguement
// and returns recipe detail
// initialize current recipe state as an object
// Use useParams to get recipeId
// 
export const RecipeDetail = () => {
    const [recipe, setRecipe] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [steps, setSteps] = useState([])
    const { recipeId } = useParams()
    
    useEffect(
        () => {
            getRecipeDetail(recipeId)
                .then((data) =>
                    setRecipe(data))
        },
        [recipeId]
    )
    useEffect(
        () => {
            getRecipeIngredients(recipeId)
                .then((data) =>
                setIngredients(data))
        },
        [recipeId]
    )
    useEffect(
        () => {
            getRecipeSteps(recipeId)
                .then((data) =>
                setSteps(data))
        },
        [recipeId]
    )

    return (
        <>
            {
                <div className="recipe_detail" key={recipe.id}>
                    <h2>
                        {recipe.title}
                    </h2>
                    <p>Submitted by: {recipe.user?.name} </p>
                    <p>Date: {recipe.dateSubmitted}</p>
                    <p>Topic: {recipe.topic?.type}</p>
                    <img src={recipe?.img} alt="lion's mane medallions" />
                    <p>Ingredients:</p>
                    <ul>
                        {
                            ingredients.map(ingredient => {
                                return <li key={`ingredient--${ingredient.id}`}>{ingredient.ingredient}</li>
                            })
                        }
                    </ul>
                    <p>Steps:</p>
                    <ol>
                        {
                            steps.map(step => {
                                return <li key={`step--${step.id}`}>{step.step}</li>
                            })
                        }
                    </ol>
                </div>
            }
        </>
    )
}