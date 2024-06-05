import React, { useState, useEffect } from "react";
import PropTypes, { object } from "prop-types";


// function SinglesMatch() {
//     return (
//         <div>Singles Match started.</div>
//     )
// }

async function handleSinglesMatch(matchupElement, url) {
    console.log('handleSingles');
    let dropdown1 = document.createElement('select');
    dropdown1.setAttribute('name', 'wrestler1');
    dropdown1.setAttribute('id', 'wrestler1');
    let api_data = {};
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        api_data = result;
        console.log('Response:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    let wrestlersArray = api_data["wrestlers"];
    wrestlersArray.forEach(wrestler => {
        let option = document.createElement('option');
        option.setAttribute('value', wrestler['name']);
        option.innerHTML = wrestler['name'];
        dropdown1.appendChild(option);
        matchupElement.appendChild(dropdown1);
    });
    
    let vs = document.createElement('h4');
    vs.setAttribute('id', 'vs');
    vs.innerHTML = 'vs';
    matchupElement.appendChild(vs);


    let dropdown2 = document.createElement('select');
    dropdown2.setAttribute('name', 'wrestler2');
    dropdown2.setAttribute('id', 'wrestler2');
    wrestlersArray.forEach(wrestler => {
        let option = document.createElement('option');
        option.setAttribute('value', wrestler['name']);
        option.innerHTML = wrestler['name'];
        dropdown2.appendChild(option);
        matchupElement.appendChild(dropdown2);
    });
};

async function handleWorldTitleMatch(matchupElement, wrestlersUrl, worldTitleUrl) {
    console.log('handleWorldTitle');
    let dropdown1 = document.createElement('select');
    dropdown1.setAttribute('name', 'wrestler1');
    dropdown1.setAttribute('id', 'wrestler1');
    let api_data = {};
    try {
        const response = await fetch(worldTitleUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        api_data = result;
        console.log('Response:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    let world_champ = api_data["world_champ"];
    let option = document.createElement('option');
    option.setAttribute('value', world_champ['name']);
    option.innerHTML = world_champ['name'];
    dropdown1.appendChild(option);
    matchupElement.appendChild(dropdown1);
    
    let vs = document.createElement('h4');
    vs.setAttribute('id', 'vs');
    vs.innerHTML = 'vs';
    matchupElement.appendChild(vs);

    let dropdown2 = document.createElement('select');
    dropdown2.setAttribute('name', 'wrestler2');
    dropdown2.setAttribute('id', 'wrestler2');
    try {
        const response = await fetch(wrestlersUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        api_data = result;
        console.log('Response:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    let wrestlersArray = api_data["wrestlers"];
    wrestlersArray.forEach(wrestler => {
        if (wrestler['name'] === world_champ['name']) {
            return;
        }
        let option = document.createElement('option');
        option.setAttribute('value', wrestler['name']);
        option.innerHTML = wrestler['name'];
        dropdown2.appendChild(option);
        matchupElement.appendChild(dropdown2);
    });
};

async function handleTVTitleMatch(matchupElement, wrestlersUrl, tvTitleUrl) {
    console.log('handleTVTitle');
    let dropdown1 = document.createElement('select');
    dropdown1.setAttribute('name', 'wrestler1');
    dropdown1.setAttribute('id', 'wrestler1');
    let api_data = {};
    try {
        const response = await fetch(tvTitleUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        api_data = result;
        console.log('Response:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    let tv_champ = api_data["tv_champ"];
    let option = document.createElement('option');
    option.setAttribute('value', tv_champ['name']);
    option.innerHTML = tv_champ['name'];
    dropdown1.appendChild(option);
    matchupElement.appendChild(dropdown1);
    
    let vs = document.createElement('h4');
    vs.setAttribute('id', 'vs');
    vs.innerHTML = 'vs';
    matchupElement.appendChild(vs);

    let dropdown2 = document.createElement('select');
    dropdown2.setAttribute('name', 'wrestler2');
    dropdown2.setAttribute('id', 'wrestler2');
    try {
        const response = await fetch(wrestlersUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        api_data = result;
        console.log('Response:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    let wrestlersArray = api_data["wrestlers"];
    wrestlersArray.forEach(wrestler => {
        if (wrestler['name'] === tv_champ['name']) {
            return;
        }
        let option = document.createElement('option');
        option.setAttribute('value', wrestler['name']);
        option.innerHTML = wrestler['name'];
        dropdown2.appendChild(option);
        matchupElement.appendChild(dropdown2);
    });
};

const createSinglesMatch = () => {
    const matchupElement = document.getElementById('matchup');
    console.log(matchupElement);
    console.log(matchupElement.hasChildNodes());
    if (matchupElement.hasChildNodes()) {
        const header = document.getElementById('singlesmatch');
        matchupElement.removeChild(header);
        const w1 = document.getElementById('wrestler1');
        matchupElement.removeChild(w1);
        const w2 = document.getElementById('wrestler2');
        matchupElement.removeChild(w2);
        const versus = document.getElementById('vs');
        matchupElement.removeChild(vs);
    }
    let newElement = document.createElement('h3');
    newElement.setAttribute('id', 'singlesmatch');
    newElement.innerHTML = 'Singles Match';
    matchupElement.appendChild(newElement);
    const wrestlersUrl = '/api/';
    handleSinglesMatch(matchupElement, wrestlersUrl);
};

const createWorldTitleMatch = () => {
    const matchupElement = document.getElementById('matchup');
    console.log(matchupElement);
    console.log(matchupElement.hasChildNodes());
    if (matchupElement.hasChildNodes()) {
        const header = document.getElementById('singlesmatch');
        matchupElement.removeChild(header);
        const w1 = document.getElementById('wrestler1');
        matchupElement.removeChild(w1);
        const w2 = document.getElementById('wrestler2');
        matchupElement.removeChild(w2);
        const versus = document.getElementById('vs');
        matchupElement.removeChild(vs);
    }
    let newElement = document.createElement('h3');
    newElement.setAttribute('id', 'worldtitlematch');
    newElement.innerHTML = 'World Title Match';
    matchupElement.appendChild(newElement);
    const wrestlersUrl = '/api/';
    const worldTitleUrl = '/api/worldchamp/';
    handleWorldTitleMatch(matchupElement, wrestlersUrl, worldTitleUrl);
};

const createTVTitleMatch = () => {
    const matchupElement = document.getElementById('matchup');
    console.log(matchupElement);
    console.log(matchupElement.hasChildNodes());
    if (matchupElement.hasChildNodes()) {
        const header = document.getElementById('singlesmatch');
        matchupElement.removeChild(header);
        const w1 = document.getElementById('wrestler1');
        matchupElement.removeChild(w1);
        const w2 = document.getElementById('wrestler2');
        matchupElement.removeChild(w2);
        const versus = document.getElementById('vs');
        matchupElement.removeChild(vs);
    }
    let newElement = document.createElement('h3');
    newElement.setAttribute('id', 'tvtitlematch');
    newElement.innerHTML = 'TV Title Match';
    matchupElement.appendChild(newElement);
    const wrestlersUrl = '/api/';
    const tvTitleUrl = '/api/tvchamp/';
    handleTVTitleMatch(matchupElement, wrestlersUrl, tvTitleUrl);
};

export default function Menu() {
    return (
        <>
        <button type='button' onClick={createSinglesMatch}>Singles Match</button>
        <button type='button' onClick={createWorldTitleMatch}>World Title Match</button>
        <button type='button' onClick={createTVTitleMatch}>TV Title Match</button>
        </>
    );
};

