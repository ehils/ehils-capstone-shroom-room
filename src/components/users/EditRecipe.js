// use params get recipe data
// inputs have a value
// {recipe.description}
// const [recipe, editRecipe]
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getRecipeDetail, getRecipeIngredients, getRecipeSteps, getTopics } from "../ApiManager";
// this module will be create the form to add recipes
// 
// 
// define a function that renders the html for the add recipe page
export const EditRecipe = () => {
    // define state for the recipe object
    const {recipeId} = useParams()
    const [recipe, updateRecipe] = useState({
        title: "",
        description: "",
        topicId: 1
    })
    // initialize state for steps
    
    const [currentStep, setCurrentStep] = useState("")
    const [stepsArray, setStepArray] = useState([])
    const [currentIngredient, setCurrentIngredient] = useState("")
    const [ingredientsArray, setIngredientArray] = useState([])
    const [constStepsArray, setConstStepsArray] = useState([])
    const [constIngredientsArray, setConstIngredientsArray] = useState([])


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
    useEffect(
        () => {
            getRecipeDetail(recipeId)
                .then((data) => {
                    updateRecipe(data)
                })
        }, []
    )
    useEffect(
        () => {
            getRecipeSteps(recipeId)
                .then((data) => {
                    let copy = [...data]
                    setConstStepsArray(copy)
                    setStepArray(data)
                })
        }, []
    )
    console.log(stepsArray)
    useEffect(
        () => {
            getRecipeIngredients(recipeId)
                .then((data) => {
                    let copy = [...data]
                    setConstIngredientsArray(copy)
                    setIngredientArray(data)
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
            dateSubmitted: recipe.dateSubmitted,
            title: recipe.title,
            img: recipe.img,
            description: recipe.description,
            topicId: recipe.topicId
        }

        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe)
        }

        return fetch(`http://localhost:8088/recipes/${recipeId}`, fetchOption)
            .then((res) => res.json())
            .then((res) => {
                debugger
                constStepsArray.forEach(step => {
                    return fetch(`http://localhost:8088/steps/${step.id}`, {
                        method: "DELETE"
                    })
                })
                stepsArray.forEach((currentStep) => {
                    const recId = parseInt(recipeId)
                    const step = currentStep.step

                    const newStep = {
                        recipeId: recId,
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
                constIngredientsArray.forEach(ingredient => {
                    return fetch(`http://localhost:8088/ingredients/${ingredient.id}`, {
                        method: "DELETE"
                    })
                })
                
                ingredientsArray.forEach((currentIngredient) => {
                    const recId = parseInt(recipeId)
                    const ingredient = currentIngredient.ingredient

                    const newIngredient = {
                        recipeId: recId,
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
                
            })
            .then(() => {
                history.push(`/myrecipes/${parseInt(localStorage.getItem("shroom_room_user"))}`)
            })
    }

    // function that adds ingredients
    const addStep = (e, currentStep) => {
        e.preventDefault()
        const copy = [...stepsArray]
        copy.push({step: currentStep})
        setStepArray(copy)
    }
    const deleteStep = (stepIdObj) => {

        const index = parseInt(stepIdObj)
        stepsArray.splice(index, 1)
        const copy = [...stepsArray]
        setStepArray(copy)
    }
    const addIngredient = (e, currentIngredient) => {
        e.preventDefault()
        const copy = [...ingredientsArray]
        copy.push({ingredient: currentIngredient})
        setIngredientArray(copy)
        setCurrentIngredient("")
    }

    const deleteIngredient = (ingredientIdObj) => {

        const index = parseInt(ingredientIdObj)
        ingredientsArray.splice(index, 1)
        const copy = [...ingredientsArray]
        setIngredientArray(copy)
    }

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
        <>
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
                            value={recipe.title}
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
                            value={recipe.description}
                            className="form-control"
                            placeholder="Brief description of recipe"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="steps">Recipe Ingredients:</label>
                        <div>
                            <ul>
                                {
                                    ingredientsArray.map((ingredient) => {
                                        return <li key={`ingredient--${ingredient.ingredient}`}>{ingredient.ingredient}<button id={ingredientsArray.indexOf(ingredient)} onClick={
                                            (e) => {
                                                deleteIngredient(e.target.id)
                                            }
                                        }>Delete Ingredient</button></li>
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
                        /><button onClick={
                            (e) => addIngredient(e, currentIngredient)
                            }>Add ingredients</button>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="steps">Recipe Steps:</label>
                        <div>
                            <ul>
                                {
                                    stepsArray.map((step) => {
                                        
                                        return <li key={`step--${step.step}`}>{step.step}<button id={stepsArray.indexOf(step)}
                                            onClick={
                                                (e) => {
                                                    deleteStep(e.target.id)
                                                }
                                            }>Delete Step</button></li>
                                    })
                                }
                            </ul>
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
                            type="text"
                            name="steps"
                            className="form-control"
                            placeholder="enter step here"
                        /><button onClick={(e) => addStep(e,currentStep)}>Add Step</button>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="recipe__topic">Shroom Topic:</label>
                        <select value={recipe.topicId}
                            defaultValue={"0"}
                            
                            onChange={(e) => {
                                const copy = { ...recipe }
                                copy.topicId = parseInt(e.target.value)
                                updateRecipe(copy)
                            }}>
                            <option value="0">Select a topic..</option>
                            {topics.map(topic => {
                                return <option value={topic.id}>
                                    {topic.type}
                                </option>
                            })
                            }

                        </select>
                    </div>
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
                            value={recipe.img}
                            className="form-control"
                            placeholder="enter image link here"
                        />
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={saveRecipe}>
                    Submit Recipe
                </button>
            </form>
        </>
    )
}
