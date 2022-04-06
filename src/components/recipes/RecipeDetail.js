import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getRecipeComments, getRecipeDetail, getRecipeIngredients, getRecipeSteps } from "../ApiManager";
import { Accordion, Button, Col, Container, Figure, Row } from "react-bootstrap";
import "./RecipeDetail.css"
import { RecipeComments } from "./RecipeComments";
import { RecipeRating } from "./RecipeRating";
// define a function which takes a single recipe arguement
// and returns recipe detail
// initialize current recipe state as an object
// Use useParams to get recipeId
// 
export const RecipeDetail = () => {
    const [recipe, setRecipe] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [comments, setComments] = useState([])
    const [steps, setSteps] = useState([])
    const { recipeId } = useParams()
    useEffect(
        () => {
            getRecipeComments(recipeId)
                .then((data) =>
                    setComments(data))
        },
        [recipeId]
    )
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
                <Container fluid="sm" className="recipe_detail" key={recipe.id}>
                    <Row>

                        <Col bg="flat">
                            <Accordion bg="flat" defaultActiveKey={"0"} flush alwaysOpen>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header bg="flat">
                                        {recipe.title}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Figure>
                                            <Figure.Image className="img-fluid shadow-4-strong"

                                                alt={recipe?.title}
                                                src={recipe?.img}

                                            />
                                            <Figure.Caption className="recipe_content">
                                                <p>Submitted by: {recipe.user?.name} </p>
                                                <p>Date: {recipe.dateSubmitted?.split(",")[0]}</p>
                                                <p>Topic: {recipe.topic?.type}</p>
                                                <p>
                                                    Average Rating: {<RecipeRating recipe={recipe} />}
                                                </p>
                                            </Figure.Caption>
                                        </Figure>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        Ingredients
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul>
                                            {
                                                ingredients.map(ingredient => {
                                                    return <li key={`ingredient--${ingredient.id}`}>{ingredient.ingredient}</li>
                                                })
                                            }
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        Steps
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ol>
                                            {
                                                steps.map(step => {
                                                    return <li key={`step--${step.id}`}>{step.step}</li>
                                                })
                                            }
                                        </ol>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        Comments
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {/* <ul>
                                            {
                                                comments.map(comment => {
                                                    return <li key={`comment--${comment.id}`}>{comment.comment}</li>
                                                })
                                            }
                                        </ul> */}
                                        <RecipeComments recipeId={recipeId} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    )
}