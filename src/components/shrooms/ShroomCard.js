import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import "./ShroomDetail.css"
import { ShroomRecipes } from "./ShroomRecipes";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


export const ShroomCard = ({ shroom }) => {
    const { shroomId } = useParams()

    return (
        <>
            <Card className="shroom_card" id={shroom.id} >
                <Card.Header as="h2">{shroom.name}</Card.Header>
                <Card.Img variant="top" src={shroom.img} />
                <Card.Body>
                    {/* <Card.Subtitle>Also Known As:</Card.Subtitle>
                    <Card.Text>
                        {shroom.alsoKnownAs}
                    </Card.Text> */}
                    <Card.Subtitle>Edibility:</Card.Subtitle>
                    <Card.Text>{shroom.shroomToxicity?.type}</Card.Text>
                    <Link to={`/shrooms/${shroom.id}`}>
                        Learn More
                    </Link>{"   "}
                    <Link to={`/shroomrecipes/${shroom.id}`}>
                        Shroom Recipes
                    </Link>
                    {/* most popular uses based on recipe topics and tags in recipe */}

                </Card.Body>
            </Card>
        </>
    )
}

    // "id": 1,
    // "name": "Portobello",
    // "description": "Agaricus bisporus is an edible basidiomycete mushroom native to grasslands in Europe and North America. It has two color states while immature—white and brown—both of which have various names. This mushroom is commonly sold under the name portobello mushroom (also portabella or portobella) but the etymology is disputed. When immature and white, this mushroom may be known as common mushroom, white mushroom, button mushroom, cultivated mushroom, table mushroom, and champignon mushroom. When immature and brown, it may be known variously as Swiss brown mushroom, Roman brown mushroom, Italian brown mushroom, cremini/crimini mushroom, or chestnut mushroom.",
    // "scientific_name": "Agaricus bisporus",
    // "wikipedia_url": "https://en.wikipedia.org/wiki/Agaricus_bisporus",
    // "commercially_harvested": true,
    // "commercially_cultivated": true,
    // "meaning": "",
    // "alsoKnownAs": "",
    // "feasting": "",
    // "preserving": "",
    // "farming": "",
    // "img": "",
