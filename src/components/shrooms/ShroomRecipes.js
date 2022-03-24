import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { getRecipesExpanded, getSpecificRecipeMushrooms, getTopics, getUsers } from "../ApiManager";
import { RecipeCard } from "../recipes/RecipeCard";


// this page will display the latest cards, based upon date posted
// define a function that exports jsx for home page
// import RecipeCard
// initialize recipes state
// iterate recipe state and return RecipeCard

export const ShroomRecipes = () => {
    const [recipeShrooms, setRecipeShrooms] = useState([])
    const [topics, setTopics] = useState([])
    const [users, setUsers] = useState([])
    const { shroomId } = useParams()
    useEffect(() => {
        getUsers()
            .then(userResponse => {
                
                setUsers(userResponse)
                getTopics().then(topicResponse=> {
                    setTopics(topicResponse)
                })
            })



    }, [])
    useEffect(()=> { if(topics.length !== 0){
        getSpecificRecipeMushrooms(shroomId)
                        .then((data) => {
                            
                            // [0] is index 0 of this array
                            data.forEach(recipeShroom => { 
                            recipeShroom.recipe.user = users.find(user => user.id === recipeShroom.recipe.userId)
                            recipeShroom.recipe.topic = topics.find(topic => topic.id === recipeShroom.recipe.topicId)
                        })
                        setRecipeShrooms(data)
                    })}
        },[topics])
    
    return (

        <>
            {/* search recipes module-use for each page */}
            <Container fluid="sm">
                {recipeShrooms.length !== 0 ? <h2>{recipeShrooms[0].shroom.name} Recipes</h2> : null }
                {
                    recipeShrooms.map(recipeShroom => {
                        return <RecipeCard recipe={recipeShroom.recipe} />
                    })
                }
            </Container>
        </>

    )
}