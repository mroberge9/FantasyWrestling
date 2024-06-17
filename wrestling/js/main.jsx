import React from "react";
import { createRoot } from "react-dom/client";
import Menu from "./matchup";

const root = createRoot(document.getElementById('reactEntry'));

function validateForm(event) {
    const wrestler1 = document.getElementById('wrestler1').value;
    const wrestler2 = document.getElementById('wrestler2').value;
    
    if (wrestler1 === wrestler2) {
        alert('Wrestler 1 and Wrestler 2 cannot be the same.');
        event.preventDefault(); // Prevent the form from submitting
    }
  };
  
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('matchform');
    form.addEventListener('submit', validateForm);
});

async function clearResults(event) {
    console.log("cleared");
    try {
        const response = await fetch("/clearResults/", {
            method: "POST",
            body: JSON.stringify({
              title: "Clear Match Results",
              completed: false
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Response:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    let result_list = document.getElementById('result_list');
    while(result_list.firstChild) {
        result_list.removeChild(result_list.firstChild);
    }
    
};

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('clear_results_button');
    button.addEventListener('click', clearResults);
});

root.render(
    <Menu />
);