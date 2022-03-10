import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { Home } from "./Home";

export const ApplicationViews = () => {
    return (
    <Route exact path="/">
        <Home />
    </Route>
    )
}