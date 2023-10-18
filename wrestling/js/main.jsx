import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById('reactEntry'));

console.log("hi");
root.render(
    <><div>hi</div></>
)