import React from "react";
import { createRoot } from "react-dom/client";
import Menu from "./matchup";

const root = createRoot(document.getElementById('reactEntry'));

root.render(
    <Menu />
);