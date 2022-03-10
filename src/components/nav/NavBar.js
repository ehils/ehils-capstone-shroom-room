import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/create">Add Recipe</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/myrecipes">My Recipes</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("shroom_room_user")
                        }
                    }>
                    Logout
                </Link>
            </li>
        </ul>
    )
}