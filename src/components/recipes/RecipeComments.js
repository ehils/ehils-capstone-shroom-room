import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { commentDelete, getRecipeComments, getRecipe, getRecipeIngredients, getRecipeSteps } from "../ApiManager";
import { Accordion, Button, Col, Container, Figure, Row } from "react-bootstrap";
import "./RecipeDetail.css"

export const RecipeComments = ({ recipeId }) => {
// ratingSTate, set rating state  ({rating: 0})
    const [ratingState, setRatingState] = useState({rating: 0})
    const [comments, setComments] = useState([])


    const [ recipe, setRecipe ] = useState({
        averageRating: 0
    })
    const history = useHistory()
    useEffect(
        () => updateCommentList(recipeId),
        [recipeId]

    )

    const averageRating = () => {
        
        const commentRating = comments.map(comment => comment?.rating)
        let reducer = (total, currentValue) => total + currentValue
        const sum = commentRating.reduce(reducer, 0)
        console.log(sum / commentRating.length)
        const ratingAvg = parseInt(sum / commentRating.length)
        return ratingAvg
    }
    const commentAverage = averageRating()

    useEffect(
        () => {
            getRecipe(recipeId)
                .then((data) =>
                    setRecipe(data))
        },
        [recipeId]
    )
        // onstarclick next vlaue setrating(next value)
        // (e) =>{onstarclick(e)}
    const updateCommentList = (recipeId) => {
        getRecipeComments(recipeId)
            .then((data) =>
                setComments(data))
    }

    const deleteComment = (id) => {
        
        commentDelete(id)
            .then(
                () => updateCommentList(recipeId)

            )

    }


    const [comment, updateComment] = useState({
        comment: "",
        recipeId: recipeId,
        userId: parseInt(localStorage.getItem("shroom_room_user"))
    })
    // const updateRecipeAverage = (event) => {
    //     event.preventDefault()
    //     const newRecipe= {
    //     averageRating: recipe.averageRating
    //     }

    //     const fetchOption = {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newRecipe)
    //     }

    //     return fetch(`http://localhost:8088/recipes/${recipeId}`, fetchOption)
    //         .then((res) => res.json())
    // }

    const saveComment = (event) => {
        event.preventDefault()
        const newComment = {
            userId: parseInt(localStorage.getItem("shroom_room_user")),
            dateSubmitted: new Date().toLocaleString(),
            comment: comment.comment,
            rating: comment.rating,
            recipeId: parseInt(recipeId),
            // rating


        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        }
        return fetch("http://localhost:8088/comments", fetchOption)
            .then(
                () => updateCommentList(recipeId)
            )

            .then(() => {
                history.push(`/recipes/${recipeId}`)
            })
    }
    return (
        <>
            <form className="recipeCommentsForm">
                <fieldset>
                    
                        <ul className="list_items">
                            {
                                comments.map(comment => {
                                    return <li className= "comment_item" id={comment.id} key={`comment--${comment.id}`}>
                                        {comment.comment}<br></br>
                                        Submitted by: {comment.user?.name}
                                        <ReactStars 
                                        size={10}
                                        value={comment.rating}
                                        edit={false} />
                                        {`${comment.rating}/${5}`}
                                        {comment.userId === parseInt(localStorage.getItem("shroom_room_user")) ?
                                            <Button variant="danger"
                                                onClick={
                                                    () => {
                                                        deleteComment(comment.id)
                                                    }
                                                }>
                                                <img src="../../x.png" width={10} />
                                            </Button> : null}
                                    </li>

                                })
                            }

                        </ul>
                    
                    <div className="form-group">
                        <label htmlFor="recipe_title">Enter Comment here</label>
                        <input
                            onChange={
                                (e) => {
                                    const copy = { ...comment }
                                    copy.comment = e.target.value
                                    updateComment(copy)
    
                                }
                            }
                            
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Tell Me What You Think..."
                        /><br></br>
                        <ReactStars
                            count={5}
                            onChange={
                                (newValue) => {
                                    const copy = { ...comment }
                                    copy.rating = newValue
                                    updateComment(copy)
                                }
                            }
                            value={0}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                        <Button className="btn btn-primary" 
                        onClick={saveComment}
                        // onChange={
                        //     (e) => {
                        //         const copy = { ...recipe }
                        //         copy.averageRating = commentAverage
                        //         updateRecipeAverage(copy)
                        //     }
                        // }
                        >
                            Submit Comment
                        </Button>

                    </div>
                </fieldset>
            </form>
        </>

    )
}