import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {AppProvider} from "./context/useContext.js";
import "./index.css";
import "./font.css";
import "react-toastify/dist/ReactToastify.css";
// import "./fonts/PressStart2P.tff";
// import "./fonts/Quicksand.tff";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>
);

reportWebVitals();
