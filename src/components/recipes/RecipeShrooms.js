import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { Badge } from "react-bootstrap";
import { getRecipeMushrooms } from "../ApiManager";
import { RecipeDetail } from "./RecipeDetail";


// recipeId arguement
export const SelectedRecipeShrooms = ({ recipeId }) => {
    // initialize recipeShroom state
    const [recipeShrooms, setRecipeShrooms] = useState([])

    useEffect(
        () => {
            getRecipeMushrooms(recipeId)
                .then((data) => {
                    setRecipeShrooms(data)
                })
        }, []
    )

    // pass recipeId as parameter


    // filterrecipe topic array to find if the recipeObject Id matches recipetopic.recipeId
    return (
        <><ul>
            {
                recipeShrooms.map(recipeShroom => {
                    return <li key={recipeShroom.id}>
                        <Link to={`/shrooms/${recipeShroom.shroomId}`}>
                            <Badge key={recipeShroom.id} size="lg" pill bg="flat">{recipeShroom.shroom.name}</Badge>
                        </Link>
                    </li>

                }
                )
            }
        </ul>
        </>
    )
}