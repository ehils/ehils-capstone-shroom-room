import React, { useState, useEffect } from "react";
import { Container, Figure, Tab, Tabs } from "react-bootstrap";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getMushroomDetail } from "../ApiManager";
import "./ShroomDetail.css"

export const ShroomDetail = () => {
    const [shroom, setShroom] = useState([])
    const { shroomId } = useParams()
    useEffect(
        () => {
            
            getMushroomDetail(shroomId)
                .then((data) =>

                    setShroom(data)
                )
        },
        [shroomId]
    )
   

    return (
        <>{
            <Container className="shroom_profile">
                <section className="shroom_profile">
                    <h1>{shroom.name}</h1>
                    <div className="shroom_header">
                        <Figure>
                            <Figure.Image alt="171x180" src={shroom.img} />
                        </Figure>
                    </div>
                    <div className="shroom_detail">

                        <Tabs defaultActiveKey="name" id={shroom.id} className="shroom_details">
                    
                            <Tab eventKey="name" title="Naming and Etymology">
                                <ul id="name">
                                <li>Name: {shroom.name}</li><br></br>
                                <li>Speciies: {shroom.scientific_name}</li><br></br>
                                <li>Meaning: "<em>{shroom.scientific_name}</em>"</li><br></br>                                 
                                <li>Also known as: {shroom.alsoKnownAs}</li><br></br>
                                </ul>
                                
                            </Tab>
                            <Tab eventKey="description" title="Description">
                                Description: {shroom.description}<br></br>
                            </Tab>
                            <Tab eventKey="Consumption" title="Consumption">
                               Preparation: {shroom.feasting}
                               <br></br>
                               <br></br>
                               
                               Preservation: {shroom.preserving}<br></br>

                            </Tab>
                            <Tab eventKey="Harvesting" title="Harvesting" >
                                Commercially cultivated: {shroom.commercially_cultivated ? "yes" : "no"}<br></br>
                               <br></br>
                               Commercially harvested: {shroom.commercially_harvested ? "yes" : "no"}<br></br>
                               <br></br>
                               Farming: {shroom.farming}<br></br>
                               <br></br>
                            </Tab>
                            <Tab eventKey="Resources" title="Resources" >
                                {/* <Link to={window.location.replace(shroom.wikipedia_url)}>wiki</Link> */}
                                <a target="_blank" href={`${shroom.wikipedia_url}`}>Wiki</a>

                            </Tab>
                        </Tabs>

                    </div>
                </section>
            </Container>
        } </>
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