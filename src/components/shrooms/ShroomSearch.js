
import React from "react";

export const ShroomSearch = ({ setSearchField }) => {

    
    
    const searchChange = (e) => {
        
        // setting searchField variable to evnt target value
        console.log(e.target.value)
        if (e.charCode === 13){
        setSearchField(e.target.value)
        }
        
    }
    return (
        <section className="shroom__search">
            <h2>Search Shrooms</h2>
            <div className="shroom__searchInput">
                <input className="input" type="search" placeholder="Enter Shroom Here"
                // the input
                onKeyPress={searchChange} 
                />
            </div>
        </section>
    )
}