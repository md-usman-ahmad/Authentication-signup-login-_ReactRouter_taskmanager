import ReactDom from "react-dom/client";
import {App} from "./components/App.jsx"


const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
    <>
        <App></App>
    </>
)