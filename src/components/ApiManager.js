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