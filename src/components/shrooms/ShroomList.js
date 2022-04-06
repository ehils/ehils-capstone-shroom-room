import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import { getMushrooms } from "../ApiManager";
import { Container, Row } from "react-bootstrap";
import { ShroomCard } from "./ShroomCard";
import "./ShroomDetail.css"

export const ShroomList = ({searchField}) => {
    const [shrooms, setShrooms] = useState([])

    const [foundShrooms, setFoundShrooms] = useState([]);

    useEffect(
        () => {
            getMushrooms()
                .then((data) =>
                    setShrooms(data)
                )
        },
        []
    )
    useEffect(
        () => {
            getMushrooms()
                .then((data) =>
                    setFoundShrooms(data)
                )
        },
        []
    )
    useEffect(
        () => {
            renderSearch(searchField)
        },
        [searchField]
        )
        
        const renderSearch = (searchField) => {
            const foundShroomsArray = shrooms.filter(shroom => {
                
                if (searchField === "") {
                    return false
                } else if (shroom.name.toLowerCase().includes(searchField.toLowerCase())) {
                    return true
                } else return false
                
            }
            
            )
            setFoundShrooms(foundShroomsArray)
        }


    return (
        <>
        <Container fluid="sm">
        <div className="shroomContainer">
            {
                foundShrooms.map(shroom => {
                    return <ShroomCard className="search" key={shroom.id} shroom={shroom} />
                })
            }
           
        
        </div>
        </Container>
        </>
    )
}