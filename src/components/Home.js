import React, { useEffect, useState } from "react";
import { Container, Carousel, Image } from "react-bootstrap";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { getRecipesExpanded, getUsers } from "./ApiManager";
import { RecipeCard } from "./recipes/RecipeCard";

// this page will display the latest cards, based upon date posted
// define a function that exports jsx for home page
// import RecipeCard
// initialize recipes state
// iterate recipe state and return RecipeCard

export const Home = () => {
    const [recipes, setRecipes] = useState([])

    useEffect (()=>{
        getRecipesExpanded()
        .then((data) => {
            setRecipes(data)
        })
    },[])
    const [users, setUsers] =useState([]) 
  
  useEffect(() => {
    getUsers()
    .then((data) => {
      setUsers(data)
    })
},[])

    return (
        <>
        <Container>
        <Container className="login_container" fluid="md">
        {users.map(user => {
              if (user.id === parseInt(localStorage.getItem("shroom_room_user")))
              return <h1 className="hello" key={user.id}>Hello {user.name}!</h1>
            })}
                <Carousel className="home_screen_carousel">
                    <Carousel.Item>
                        <Image className="carousel_image" fluid
                            
                            src="./imgs/kng oyster.jpeg"
                            alt="First slide"
                            
                        />
                        <Carousel.Caption>
                            <h3 id="carousel_caption">Munch</h3>
                            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image fluid="sm"
                            className="carousel_image"
                            
                            src="./imgs/mushrooms-forest.jpeg"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3 className="carousel_caption">Discover</h3>
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image fluid="sm"
                            className="carousel_image"
                            
                            src="./imgs/mushroom-foraging-hedgehog.jpeg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3 className="carousel_caption">Forage</h3>
                            {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container> 
            
            <h2>What's New?</h2>      
            {
                recipes.map(recipe => {
                    return <RecipeCard recipe={recipe} />
                })
            }
        </Container>
        </>

    )
}