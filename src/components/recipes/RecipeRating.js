import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { getRecipeComments } from "../ApiManager";


export const RecipeRating = ({ recipe }) => {
    const [comments, setComments] = useState([])
    const [rating, setRating] = useState({
        value: 0,
        edit: false,
        color: "blue"
    })
    useEffect(
        () => {
            getRecipeComments(recipe.id)
                .then((data) =>
                    setComments(data))
        }, [recipe]

    )

    useEffect(() => {
        const commentRating = comments.map(comment => comment?.rating)
        let reducer = (total, currentValue) => total + currentValue
        const sum = commentRating.reduce(reducer, 0)
        console.log(sum / commentRating.length)
        const ratingAvg = parseInt(sum / commentRating.length)
        
        const copy = { ...rating }
        copy.value = ratingAvg
        copy.color = "blue"
        copy.size = 24
        copy.activeColor = "#FCB401"
        copy.edit = false
        copy.isHalf = true
        // debugger
        setRating(copy)

    }, [comments])

    

    
    return (
        <>
           {rating.value ? <div>
                <ReactStars 
                value={rating.value}
                edit={rating.edit} />
                <p>
                    {rating.value}/5
                </p>

            </div> : <p>0/5</p>}
        </>
    )
}