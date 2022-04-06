import React, {useState} from "react"
import { ShroomList } from "./ShroomList"
import { ShroomSearch } from "./ShroomSearch"
export const Shrooms = () => {
    const [searchField, setSearchField] = useState("")
    // const [products, setProducts] = useState([])
    // const listRender = () => {
    //     productTypeFetch()
    //         .then((data) =>
    //             setProducts(data)
    //         )
    // }
    
    
    // useEffect(() =>{
    //     listRender()
    // },
    // []
    // )
    
    
    
    
    return (
        <>
        <ShroomSearch setSearchField={setSearchField} searchField={searchField}/>
            <ShroomList searchField={searchField} />
            </>
    )
    }