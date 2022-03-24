import React, { useRef, useState } from "react"
import { Button, Carousel, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { getEmails } from "../ApiManager";
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return getEmails(email)
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("shroom_room_user", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <>
            
            <Container className="main">
            <Container className="login container" fluid="md">
                <Carousel>
                    <Carousel.Item>
                        <Image className="carousel_image" fluid="sm"
                            
                            src="https://www.thesophisticatedcaveman.com/wp-content/uploads/2019/02/pan-fried-oyster-mushrooms.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Munch</h3>
                            {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image fluid="sm"
                            className="carousel_image"
                            src="https://149366112.v2.pressablecdn.com/wp-content/uploads/2017/08/mushrooms-forest-e1504282799930.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Discover</h3>
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image fluid="sm"
                            className="carousel_image"
                            src="https://modernfarmer.com/wp-content/uploads/2016/09/mushroom-foraging-hedgehog.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Forage</h3>
                            {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>
                <main className="container--login">
                <dialog className="dialog dialog--auth" ref={existDialog}>
                    <div>User does not exist</div>
                    <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
                </dialog>

                <section>
                    <form className="form--login" onSubmit={handleLogin}>
                        <h1>Welcome to Shroom Room</h1>
                        <h2>Please sign in</h2>
                        <fieldset>
                            <label htmlFor="inputEmail"> Email address </label>
                            <input type="email"
                                onChange={evt => set(evt.target.value)}
                                className="form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </fieldset>
                        <fieldset>
                            <Button type="submit">
                                Sign in
                            </Button>
                        </fieldset>
                    </form>
                </section>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
            </main>
            </Container>

        </>
    )
}

