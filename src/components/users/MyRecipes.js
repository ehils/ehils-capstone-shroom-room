import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getRecipesExpanded, getUserRecipes } from "../ApiManager";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// This page will display the users recipes as cards,
// with the option to edit or delete existing recipes

export const MyRecipes = () => {
    const [recipes, setRecipes] = useState([])
    const { userId } = useParams()

    // history can be used as a link, "after something is done, do this"
    const history = useHistory()

    const updateRecipeList = () => {
        getUserRecipes(userId)
            .then((data) => {
                setRecipes(data)
            })
    }

    useEffect(
        () => {
            updateRecipeList()
        },
        []
    )
    // state for updating form

    // state for deleting post  
    const deleteRecipe = (id) => {
        fetch(`http://localhost:8088/recipes/${id}`, {
            method: "DELETE"
        }).then(
            () => updateRecipeList()
        )
    }



    return (
        <>
            {
                recipes.map((recipe) => {
                    return <Card key={`recipe--${recipe.id}`} className="recipe_card" id={recipe.id} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={recipe.img} />
                        <Card.Body>
                            {/* links to recipe details page */}
                            
                            <Link to={`/recipes/${recipe.id}`}>
                                <h2>{recipe.title}</h2>
                            </Link>
                            <Card.Text>
                                {recipe.description}
                            </Card.Text>
                            <Card.Subtitle>Submission Date:</Card.Subtitle>
                            <Card.Text>{recipe.dateSubmitted}</Card.Text>
                            <Card.Subtitle>Topic:</Card.Subtitle>
                            <Card.Text>{recipe.topic.type}</Card.Text>
                        </Card.Body>
                        <Button variant="primary" 
                        onClick={()=> {
                            history.push(`/editrecipe/${recipe.id}`)
                        }}
                        >Edit</Button>
                        <Button variant="primary" onClick={() => {
                            deleteRecipe(recipe.id)
                        }}>
                            Delete</Button>
                    </Card>
                }

                )
            }
        </>
    )
}
