import React, { useRef, useState } from "react"
import { Button, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { getEmails } from "../ApiManager";
import "./Login.css"
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



            <body
            >
                <main className="container--login">
                    <dialog className="dialog dialog--auth" ref={existDialog}>
                        <div>User does not exist</div>
                        <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
                    </dialog>

                    <section className="shroom_room_logo">

                        <img className="mushroom_logo" src="https://www.pngkit.com/png/full/769-7690871_747-x-800-2-red-mushroom.png" width="40px" height="40px" />

                        <h1 className="sign_in">Welcome to Shroom Room</h1>

                        <img className="mushroom_logo" src="https://www.pngkit.com/png/full/769-7690871_747-x-800-2-red-mushroom.png" width="40px" height="40px" />

                    </section>

                    <Container bg="dark" variant="dark" className="main" fluid="xs">
                        <section>
                            <form className="form--login" onSubmit={handleLogin}>

                                <Row>
                                    <Col>
                                        <h2>Please sign in</h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <fieldset>
                                            <label htmlFor="inputEmail"> Email address </label>
                                            <input type="email"
                                                onChange={evt => set(evt.target.value)}
                                                className="form-control"
                                                placeholder="Email address"
                                                required autoFocus />
                                        </fieldset>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <fieldset>
                                            <Button variant="flat" type="submit">
                                                Sign in
                                            </Button>
                                        </fieldset>
                                    </Col>
                                </Row>

                            </form>
                        </section>

                        <section className="link--register">
                            <Link to="/register">Not a member yet?</Link>
                        </section>
                    </Container>

                </main>
            </body>

        </>
    )
}

