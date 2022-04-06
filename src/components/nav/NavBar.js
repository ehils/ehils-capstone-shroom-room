import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
import { Nav, Navbar, NavDropdown } from "react-bootstrap";


export const NavBar = () => {
    return (
        <div className="navBar">
            <Navbar bg="flat" variant="dark" sticky="top" expand="sm" collapseonselect={"true"}>
                <Navbar.Brand className="logo">
                    <img src="https://www.pngkit.com/png/full/769-7690871_747-x-800-2-red-mushroom.png" width="40px" height="40px" />
                    ShroomRoom
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link className="navbar__link" href="/">Home</Nav.Link>
                        

                        <NavDropdown variant="dark" title="Discover" id="discover_dropdown">
                            <NavDropdown.Item variant="dark" href="/shrooms" className="navbar_dropdown_item" eventKey="4.1">
                                Shrooms
                                {/* <Nav.Link as={Link} className="navbar_dropdown_link" to="/shrooms">Shrooms </Nav.Link> */}
                                

                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown  title="Munch" id="nav-dropdown">
                            <NavDropdown.Item href="/recipes" className="navbar_dropdown_item" variant="success" eventKey="4.1">
                                Recipes
                                {/* <Nav.Link as={Link} variant="primary" className="navbar__link" to="/recipes">Recipes</Nav.Link> */}
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/create/addrecipe"className="navbar_dropdown_item" eventKey="4.2">
                                Add Recipe
                                {/* <Nav.Link as={Link} className="navbar_dropdown_link" to="/create/addrecipe">Add Recipe</Nav.Link> */}
                            </NavDropdown.Item>
                            <NavDropdown.Item href={`/myrecipes/${localStorage.getItem("shroom_room_user")}`} className="navbar_dropdown_item" eventKey="4.3">
                                My Recipes
                                {/* <Nav.Link as={Link} className="navbar_dropdown_link" to={`/myrecipes/${localStorage.getItem("shroom_room_user")}`}>My Recipes</Nav.Link> */}
                            </NavDropdown.Item>
                            
                        </NavDropdown>
                        <NavDropdown title="Forgage" id="forage_dropdown">
                            <NavDropdown.Item href="/forage" className="navbar_dropdown_item" eventKey="4.1">
                                Forage

                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link as={Link} className="navbar__link" to="#"
                            onClick={
                                () => {
                                    localStorage.removeItem("shroom_room_user")
                                }
                            }>
                            Logout
                        </Nav.Link>

                    </Nav>









                </Navbar.Collapse>

            </Navbar>
        </div>
    )
}

{/* <li className="navbar__item active"></li> */ }