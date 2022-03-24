// iterate through shrooms and display them as cards
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { getMushrooms } from "../ApiManager";
import { Container, Row } from "react-bootstrap";
import { ShroomCard } from "./ShroomCard";
import "./ShroomDetail.css"

export const Shrooms = () => {
    const [shrooms, setShrooms] = useState([])

    useEffect(
        () => {
            getMushrooms()
                .then((data) =>
                    setShrooms(data)
                )
        },
        []
    )


    return (
        <>
        <Container fluid="sm">
        <div className="shroomContainer">
            {
                shrooms.map(shroom => {
                    return <ShroomCard shroom={shroom} />
                })
            }
           
        
        </div>
        </Container>
        </>
    )
}