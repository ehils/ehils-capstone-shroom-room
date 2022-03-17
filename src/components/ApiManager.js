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
// AddRecipe Line
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
// Line 60
export const getRecipeIngredients = (recipeId) => {
    return fetch(`http://localhost:8088/ingredients?recipeId=${recipeId}`)
        .then(res => res.json())
}
// Line 52
export const getRecipeSteps = (recipeId) => {
    return fetch(`http://localhost:8088/steps?recipeId=${recipeId}`)
        .then(res => res.json())
}
