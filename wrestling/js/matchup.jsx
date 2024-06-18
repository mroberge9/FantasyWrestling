import React, { useState, useEffect } from "react";


function SinglesMatch() {
    console.log("singles match started");

};

// document.getElementById('clear_results_button').onclick = function() {clearResults()};




async function handleSinglesMatch(url) {
    console.log('handleSingles');
    // let form = document.createElement('form');
    // form.setAttribute('action', '/singles/');
    // form.setAttribute('method', 'post');
    // let dropdown1 = document.createElement('select');
    // dropdown1.setAttribute('name', 'wrestler1');
    // dropdown1.setAttribute('id', 'wrestler1');
    let matchform = document.getElementById('matchform');
    matchform.setAttribute('action', '/singles/')
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
    let wrestler1Element = document.getElementById('wrestler1');
    while(wrestler1Element.firstChild) {
        wrestler1Element.removeChild(wrestler1Element.firstChild);
    }
    wrestlersArray.forEach(wrestler => {
        let option = document.createElement('option');
        option.setAttribute('value', wrestler['name']);
        option.innerHTML = wrestler['name'];
        wrestler1Element.appendChild(option);
    });
    // form.appendChild(dropdown1);
    
    // let vs = document.createElement('h4');
    // vs.setAttribute('id', 'vs');
    // vs.innerHTML = 'vs';
    // form.appendChild(vs);


    // let dropdown2 = document.createElement('select');
    // dropdown2.setAttribute('name', 'wrestler2');
    // dropdown2.setAttribute('id', 'wrestler2');
    let wrestler2Element = document.getElementById('wrestler2');
    while(wrestler2Element.firstChild) {
        wrestler2Element.removeChild(wrestler2Element.firstChild);
    }
    wrestlersArray.forEach(wrestler => {
        let option = document.createElement('option');
        option.setAttribute('value', wrestler['name']);
        option.innerHTML = wrestler['name'];
        wrestler2Element.appendChild(option);
    });
    // form.appendChild(dropdown2);

    // let submit = document.createElement('input');
    // submit.setAttribute('type', 'submit');
    // submit.setAttribute('value', 'Submit');
    // let br = document.createElement('br');
    // form.appendChild(br);
    // form.appendChild(br);
    // form.appendChild(submit);
    // matchupElement.appendChild(form);

    SinglesMatch();
};

async function handleWorldTitleMatch(wrestlersUrl, worldTitleUrl) {
    console.log('handleWorldTitle');
    // let dropdown1 = document.createElement('select');
    // dropdown1.setAttribute('name', 'wrestler1');
    // dropdown1.setAttribute('id', 'wrestler1');
    let matchform = document.getElementById('matchform');
    matchform.setAttribute('action', '/worldtitle/')
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
    // console.log(typeof(world_champ));
    let wrestler1Element = document.getElementById('wrestler1');
    // console.log(wrestler1Element.childNodes)
    while(wrestler1Element.firstChild) {
        wrestler1Element.removeChild(wrestler1Element.firstChild);
    }
    console.log(world_champ);
    if (world_champ === null) {
        console.log("no world champ");
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
            let option = document.createElement('option');
            option.setAttribute('value', wrestler['name']);
            option.innerHTML = wrestler['name'];
            wrestler1Element.appendChild(option);
        });
    }
    else {
        let option = document.createElement('option');
        option.setAttribute('value', world_champ['name']);
        option.innerHTML = world_champ['name'];
        wrestler1Element.appendChild(option);
    }
    // matchupElement.appendChild(dropdown1);
    
    // let vs = document.createElement('h4');
    // vs.setAttribute('id', 'vs');
    // vs.innerHTML = 'vs';
    // matchupElement.appendChild(vs);

    // let dropdown2 = document.createElement('select');
    // dropdown2.setAttribute('name', 'wrestler2');
    // dropdown2.setAttribute('id', 'wrestler2');
    let wrestler2Element = document.getElementById('wrestler2');
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
    while(wrestler2Element.firstChild) {
        wrestler2Element.removeChild(wrestler2Element.firstChild);
    }
    wrestlersArray.forEach(wrestler => {
        if (world_champ !== null) {
            if (wrestler['name'] === world_champ['name']) {
                return;
            }
        }
        let option = document.createElement('option');
        option.setAttribute('value', wrestler['name']);
        option.innerHTML = wrestler['name'];
        wrestler2Element.appendChild(option);
        // matchupElement.appendChild(dropdown2);
    });
};

async function handleTVTitleMatch(wrestlersUrl, tvTitleUrl) {
    console.log('handleTVTitle');
    // let dropdown1 = document.createElement('select');
    // dropdown1.setAttribute('name', 'wrestler1');
    // dropdown1.setAttribute('id', 'wrestler1');
    let matchform = document.getElementById('matchform');
    matchform.setAttribute('action', '/tvtitle/')
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

    let wrestler1Element = document.getElementById('wrestler1');
    while(wrestler1Element.firstChild) {
          wrestler1Element.removeChild(wrestler1Element.firstChild);
    }
    
    let tv_champ = api_data["tv_champ"];
    if (tv_champ === null) {
      console.log("no tv champ");
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
          let option = document.createElement('option');
          option.setAttribute('value', wrestler['name']);
          option.innerHTML = wrestler['name'];
          wrestler1Element.appendChild(option);
      });
    }
    else {
        let option = document.createElement('option');
        option.setAttribute('value', tv_champ['name']);
        option.innerHTML = tv_champ['name'];
        wrestler1Element.appendChild(option);
    }
    // matchupElement.appendChild(dropdown1);
    
    // let vs = document.createElement('h4');
    // vs.setAttribute('id', 'vs');
    // vs.innerHTML = 'vs';
    // matchupElement.appendChild(vs);

    // let dropdown2 = document.createElement('select');
    // dropdown2.setAttribute('name', 'wrestler2');
    // dropdown2.setAttribute('id', 'wrestler2');
    let wrestler2Element = document.getElementById('wrestler2');
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
    while(wrestler2Element.firstChild) {
        wrestler2Element.removeChild(wrestler2Element.firstChild);
    }
    wrestlersArray.forEach(wrestler => {
      if (tv_champ !== null) {
        if (wrestler['name'] === tv_champ['name']) {
            return;
        }
    }
        let option = document.createElement('option');
        option.setAttribute('value', wrestler['name']);
        option.innerHTML = wrestler['name'];
        wrestler2Element.appendChild(option);
        // matchupElement.appendChild(dropdown2);
    });
};

const createSinglesMatch = () => {
    const title = document.getElementById('title');
    title.innerHTML = "Singles Match";
    // console.log(matchupElement);
    // console.log(matchupElement.hasChildNodes());
    // console.log(matchupElement.childNodes);
    // matchupElement.childNodes.forEach(child => {
    //     console.log(child);
    //     matchupElement.removeChild(child);
    // });
    // if (matchupElement.hasChildNodes()) {
    //     const w1 = document.getElementById('wrestler1');
    //     matchupElement.removeChild(w1);
    //     const w2 = document.getElementById('wrestler2');
    //     matchupElement.removeChild(w2);
    // }
    // let newElement = document.createElement('h3');
    // newElement.setAttribute('id', 'singlesmatch');
    // newElement.innerHTML = 'Singles Match';
    // matchupElement.appendChild(newElement);
    const wrestlersUrl = '/api/';
    handleSinglesMatch(wrestlersUrl);
};

const createWorldTitleMatch = () => {
    // const matchupElement = document.getElementById('matchup');
    // matchupElement.childNodes.forEach(child => {
    //     console.log(child);
    //     matchupElement.removeChild(child);
    // });
    // if (matchupElement.hasChildNodes()) {
    //     const w1 = document.getElementById('wrestler1');
    //     matchupElement.removeChild(w1);
    //     const w2 = document.getElementById('wrestler2');
    //     matchupElement.removeChild(w2);
    // }
    // let newElement = document.createElement('h3');
    // newElement.setAttribute('id', 'worldtitlematch');
    let title = document.getElementById('title');
    title.innerHTML = 'World Title Match';
    // matchupElement.appendChild(newElement);
    const wrestlersUrl = '/api/';
    const worldTitleUrl = '/api/worldchamp/';
    handleWorldTitleMatch(wrestlersUrl, worldTitleUrl);
};

const createTVTitleMatch = () => {
    // const matchupElement = document.getElementById('matchup');
    // matchupElement.childNodes.forEach(child => {
    //     console.log(child);
    //     matchupElement.removeChild(child);
    // });
    // if (matchupElement.hasChildNodes()) {
    //     const w1 = document.getElementById('wrestler1');
    //     matchupElement.removeChild(w1);
    //     const w2 = document.getElementById('wrestler2');
    //     matchupElement.removeChild(w2);
    // }
    // let newElement = document.createElement('h3');
    // newElement.setAttribute('id', 'tvtitlematch');
    let title = document.getElementById('title');
    title.innerHTML = 'TV Title Match';
    // matchupElement.appendChild(newElement);
    const wrestlersUrl = '/api/';
    const tvTitleUrl = '/api/tvchamp/';
    handleTVTitleMatch(wrestlersUrl, tvTitleUrl);
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

