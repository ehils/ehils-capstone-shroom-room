import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getMushrooms, getTopics } from "../ApiManager";
// this module will be create the form to add recipes
// 
// 
// define a function that renders the html for the add recipe page
export const AddRecipe = () => {
    // define state for the recipe object
    const [recipe, updateRecipe] = useState({
        title: "",
        description: "",
        topicId: 1,
        img: ""

    })
    // initialize state for steps

    const [currentStep, setCurrentStep] = useState("")
    const [stepsArray, setStepArray] = useState([])
    const [currentIngredient, setCurrentIngredient] = useState("")
    const [ingredientsArray, setIngredientArray] = useState([])
    const [multiShrooms, setMultiShrooms] = useState([]);
    const [shrooms, setShrooms] = useState([])



    // intialize topic state
    const [topics, setTopics] = useState([])

    const history = useHistory()

    useEffect(
        () => {
            getTopics()
                .then((data) => {
                    setTopics(data)
                })
        }, []
    )
    // define state for recipe ingredients
    // define state for the recipe steps
    // define a function that listens to event to save recipe info to json database   
    const saveRecipe = (event) => {
        event.preventDefault()
        const newRecipe = {
            userId: parseInt(localStorage.getItem("shroom_room_user")),
            dateSubmitted: new Date().toLocaleString(),
            title: recipe.title,
            // img: figured out img here
            description: recipe.description,
            topicId: recipe.topicId,
            img: recipe.img

        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe)
        }

        return fetch("http://localhost:8088/recipes", fetchOption)
            .then((res) => res.json())
            .then((res) => {
                stepsArray.forEach((currentStep) => {
                    const recipeId = res.id
                    const step = currentStep

                    const newStep = {
                        recipeId: recipeId,
                        step: step
                    }

                    const fetchOption = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newStep)
                    }

                    return fetch("http://localhost:8088/steps", fetchOption)

                })
                ingredientsArray.forEach((currentIngredient) => {
                    const recipeId = res.id
                    const ingredient = currentIngredient

                    const newIngredient = {
                        recipeId: recipeId,
                        ingredient: ingredient
                    }

                    const fetchOption = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newIngredient)
                    }

                    return fetch("http://localhost:8088/ingredients", fetchOption)

                })
                multiShrooms.forEach((currentShroom) => {
                    const recipeId = res.id
                    const shroom = currentShroom.id

                    const newRecipeShroom = {
                        recipeId: recipeId,
                        shroomId: shroom
                    }

                    const fetchOption = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newRecipeShroom)
                    }

                    return fetch("http://localhost:8088/recipeShrooms", fetchOption)

                })

            })
            .then(() => {
                history.push(`/myrecipes/${parseInt(localStorage.getItem("shroom_room_user"))}`)
            })
    }

    // function that adds ingredients
    const addStep = (e, currentStep) => {
        e.preventDefault()
        const copy = [...stepsArray]
        copy.push(currentStep)
        setStepArray(copy)
        setCurrentStep("")
    }
    const deleteStep = (stepIdObj) => {

        const index = parseInt(stepIdObj) - 1
        stepsArray.splice(index, 1)
        const copy = [...stepsArray]
        setStepArray(copy)
    }
    const addIngredient = (e, currentIngredient) => {
        e.preventDefault()
        const copy = [...ingredientsArray]
        copy.push(currentIngredient)
        setIngredientArray(copy)
        setCurrentIngredient("")
    }

    const deleteIngredient = (ingredientIdObj) => {

        const index = parseInt(ingredientIdObj) - 1
        ingredientsArray.splice(index, 1)
        const copy = [...ingredientsArray]
        setIngredientArray(copy)
    }

    useEffect(
        () => {
            getMushrooms()
                .then((data) =>
                    setShrooms(data)
                )
        },
        []
    )

    // current step and current ingredient state



    // set an empty array equal to a variable

    // push the value of the ingredient input into array

    // reRender so that added step is listed and input and add appears
    // reRender just the steps 
    // 
    // copy.push then update
    // current stepstate onchange on input
    // onclick for adding step, state variable is arguement
    // function that adds ingredients
    // function that removesingredients

    // return the jsx for form
    
    return (
        <><Container>
            <form className="recipeForm">
                <h2 className="recipeForm__title">Add Your Recipe</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="recipe_title">Title:</label>
                        <input
                            onChange={
                                (e) => {
                                    const copy = { ...recipe }
                                    copy.title = e.target.value
                                    updateRecipe(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Recipe Title Here"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            onChange={
                                (e) => {
                                    const copy = { ...recipe }
                                    copy.description = e.target.value
                                    updateRecipe(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Brief description of recipe"
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="ingredients">Recipe Ingredients:</label>
                        <div>
                            <ul>
                                {
                                    ingredientsArray.map((ingredient) => {
                                        return <li key={`ingredient__${ingredient++}`}>{ingredient}<Button size="sm" id={ingredientsArray.length} onClick={
                                            (e) => {
                                                deleteIngredient(e.target.id)
                                            }
                                        }>Delete Ingredient</Button></li>
                                    })
                                }
                            </ul>
                        </div>
                        <input
                            onChange={
                                (e) => {
                                    let copy = { ...currentIngredient }
                                    copy = e.target.value
                                    setCurrentIngredient(copy)
                                }
                            }
                            required autoFocus
                            value={currentIngredient}
                            type="text"
                            name="ingredients"
                            className="form-control"
                            placeholder="enter ingredient here"
                        /><Button size="sm" onClick={
                            (e) => addIngredient(e, currentIngredient)
                        }>Add ingredients</Button>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="steps">Recipe Steps:</label>
                        <div>
                            <ol>
                                {
                                    stepsArray.map((step) => {
                                        return <li key={`step__${step++}`}>{step}<Button size="sm" id={stepsArray.length}
                                            onClick={
                                                (e) => {
                                                    deleteStep(e.target.id)
                                                }
                                            }>Delete Step</Button></li>
                                    })
                                }
                            </ol>
                        </div>
                        <input
                            onChange={
                                (e) => {
                                    let copy = { ...currentStep }
                                    copy = e.target.value
                                    setCurrentStep(copy)

                                }
                            }
                            required autoFocus
                            value={currentStep}
                            type="text"
                            name="steps"
                            className="form-control"
                            placeholder="enter step here"
                        /><Button size="sm" onClick={(e) => addStep(e, currentStep)}>Add Step</Button>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="recipe__topic">Shroom Topic:</label>
                        <select value={recipe.topicId.value}
                            defaultValue={"0"}
                            onChange={(e) => {
                                const copy = { ...recipe }
                                copy.topicId = parseInt(e.target.value)
                                updateRecipe(copy)
                            }}>
                            <option value="0">Select a topic..</option>
                            {topics.map(topic => {
                                return <option key={`topic--${topic.id}`} value={topic.id}>
                                    {topic.type}
                                </option>
                            })
                            }

                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <Typeahead
                    
                        id="basic-typeahead-multiple"
                        labelKey="name"
                        multiple
                        onChange={setMultiShrooms}
                        options={shrooms}
                        placeholder="Choose related mushrooms"
                        selected={multiShrooms}
                    />
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="recipe_img">Image Link:</label>
                        <input
                            onChange={
                                (e) => {
                                    const copy = { ...recipe }
                                    copy.img = e.target.value
                                    updateRecipe(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="enter image link here"
                        />
                    </div>
                </fieldset>
                <Button className="btn btn-primary" onClick={saveRecipe}>
                    Submit Recipe
                </Button>
            </form>
            </Container>
        </>
    )
}
