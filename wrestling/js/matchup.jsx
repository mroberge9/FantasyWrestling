import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";


// function SinglesMatch() {
//     return (
//         <div>Singles Match started.</div>
//     )
// }

function handleSinglesMatch(url) {
    console.log('handleSingles');
};

const createSinglesMatch = () => {
    const matchupElement = document.getElementById('matchup');
    console.log(matchupElement.hasChildNodes());
    if (matchupElement.hasChildNodes()) {
        matchupElement.removeAttribute('id', 'singlesmatch');
    }
    let newElement = document.createElement('h3');
    newElement.setAttribute('id', 'singlesmatch');
    newElement.innerHTML = 'Singles Match';
    matchupElement.appendChild(newElement);
    const wrestlersUrl = '/api/wrestlers/';
    handleSinglesMatch(wrestlersUrl);
};

export default function Matchup() {
    return (
        <>
        <button type='button' onClick={createSinglesMatch}>Singles Match</button>
        <button>World Title Match</button>
        <button>TV Title Match</button>
        </>
    );
};

