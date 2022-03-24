import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { SelectedRecipeShrooms } from "./RecipeShrooms";


// Create a card to display recipe photos, titles, and description
// the card will be used on the home screen and in the myrecipes page
// click on the card will take the user to the recipe detail page
// define RecipeCard function, takes recipes array as a parameter
// initialize topics array
// check if topic is equal to props.topicId
// initialize users array
// check if props.userId is equal to user.id
// display user.name

export const RecipeCard = ({ recipe }) => {

    return (
        <>
            <Card className="recipe_card" id={recipe.id}>
                <Card.Header as="h2">
                        {recipe.title}</Card.Header>
                <Card.Img variant="top" src={recipe.img} />
                <Card.Body>
                    {/* links to recipe details page */}
                    
                    <Card.Text>
                        {recipe.description}
                    </Card.Text>
                    <Card.Subtitle>Posted by:</Card.Subtitle>
                    <Card.Text>{recipe.user.name}</Card.Text>
                    <Card.Subtitle>Submission Date:</Card.Subtitle>
                    <Card.Text>{recipe.dateSubmitted}</Card.Text>
                    <Card.Subtitle>Topic:</Card.Subtitle>
                    <Card.Text>{recipe.topic.type}</Card.Text>
                    <Card.Subtitle>Recipe Includes:</Card.Subtitle>
                    <SelectedRecipeShrooms recipeId = {recipe.id}/><br></br>
                    <Link to={`/recipes/${recipe.id}`} > {"         "}
                        Check Out Recipe
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}