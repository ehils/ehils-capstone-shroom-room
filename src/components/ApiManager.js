// Login Line 14
export const getEmails = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
        .then(res => res.json())
}

// Register Line 13
export const getSpecificEmail = (user) => {
    return fetch(`http://localhost:8088/users?email=${user.email}`)
        .then(res => res.json())
}

//  REgister Line 22
export const postUser = (user) => {
    return fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
      .then(res => res.json())
}
// AddRecipe Line 32
export const getTopics = () => {
    return fetch("http://localhost:8088/topics")
        .then(res => res.json())
}

export const getUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(res => res.json())
}
// Home Line 16
export const getRecipesExpanded = () => {
    return fetch("http://localhost:8088/recipes?_expand=user&_expand=topic")
        .then(res => res.json())
}
// MyRecipes Line 16
export const getUserRecipes = (userId) => {
    return fetch(`http://localhost:8088/recipes?userId=${userId}&_expand=user&_expand=topic`)
        .then(res => res.json())
}

// RecipeDetail Line 18
// editRecipe Line 44
export const getRecipeDetail = (recipeId) => {
    return fetch(`http://localhost:8088/recipes/${recipeId}?_expand=user&_expand=topic`)
        .then(res => res.json())
}
// Edit RecipeLine 60
export const getRecipeIngredients = (recipeId) => {
    return fetch(`http://localhost:8088/ingredients?recipeId=${recipeId}`)
        .then(res => res.json())
}
// Edit Recipe Line 52
export const getRecipeSteps = (recipeId) => {
    return fetch(`http://localhost:8088/steps?recipeId=${recipeId}`)
        .then(res => res.json())
}
// Shroom Detail Line 10
export const getMushroomDetail = (shroomId) => {
    return fetch(`http://localhost:8088/shrooms/${shroomId}?_expand=shroomToxicity`)
        .then(res => res.json())
}
// AddRecipe Line 171
// EditRecipe Line 42
export const getMushrooms = () => {
    return fetch(`http://localhost:8088/shrooms?_expand=shroomToxicity`)
        .then(res => res.json())
}
// EditRecipe Line 51
export const getRecipeMushrooms = (recipeId) => {
    return fetch(`http://localhost:8088/recipeShrooms?recipeId=${recipeId}&_expand=shroom`)
        .then(res => res.json())
}
export const getSpecificRecipeMushrooms = (shroomId) => {
    return fetch(`http://localhost:8088/recipeShrooms?shroomId=${shroomId}&_expand=recipe&_expand=shroom`)
        .then(res => res.json())
}

