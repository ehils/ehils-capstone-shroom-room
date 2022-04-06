import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ApplicationViews } from './ApplicationViews'
import { NavBar } from './nav/NavBar'
import { Login } from './auth/Login'
import { Register } from './auth/Register';
import { getUsers } from './ApiManager';
import "react-bootstrap-typeahead/css/Typeahead.css";
// import "react-bootstrap-navdropdown/css/NavDropdown.css"



export const ShroomRoom = () => {
  const [users, setUsers] =useState([]) 
  
  useEffect(() => {
    getUsers()
    .then((data) => {
      setUsers(data)
    })
},[])
  
  return (
        <>
    <Route
      render={() => {
        if (localStorage.getItem("shroom_room_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
    )
}