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

root.render(
    <Menu />
);